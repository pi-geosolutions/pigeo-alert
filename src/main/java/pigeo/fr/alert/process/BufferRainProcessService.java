package pigeo.fr.alert.process;

import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.ListMultimap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pigeo.fr.alert.dao.UserRepository;
import pigeo.fr.alert.dao.ZoneRepository;
import pigeo.fr.alert.domain.User;
import pigeo.fr.alert.domain.UserZone;
import pigeo.fr.alert.domain.Zone;
import pigeo.fr.alert.process.buffer.BufferStats;
import pigeo.fr.alert.process.postgis.PgRasterSummary;
import pigeo.fr.alert.process.postgis.PgRasterSummaryRowMapper;
import pigeo.fr.alert.report.Report;
import pigeo.fr.alert.report.UserZonesReport;
import pigeo.fr.alert.report.entity.BufferReportModel;

import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static pigeo.fr.alert.route.Constants.*;

/**
 * Created by florent on 04/02/18.
 */

@Component()
@Transactional
public class BufferRainProcessService implements ProcessService {

    private static final Logger log = LoggerFactory.getLogger(BufferRainProcessService.class);

    public final String TABLE_NAME = "zones_buffer_50";

    int bufferSizes[] = {30, 50};
    String rasters[] = {"lastrain", "pluvio03h", "pluvio06h"};

    private String tableName;
    private String threshold;

    private String sql = "  WITH rast_buffer AS (" +
            "    SELECT (ST_DumpAsPolygons(rast)).*" +
            "    FROM ${tableName}, " + TABLE_NAME + " " +
            "    WHERE ST_Intersects(rast, the_geom)" +
            "  )" +
            "  select distinct(id) from rast_buffer, " + TABLE_NAME + " " +
            "  where val > ? and ST_Intersects(geom, the_geom)" +
            "  group by val, id;";

    
    private String statSql = "SELECT id, name, " +
            "       ST_Union(the_geom) geom, " +
            "       (ST_SummaryStatsAgg(ST_Clip(rast, the_geom, true), true, 1)).* " +
            "       FROM %s, " +
            "            %s" +
            "       WHERE ST_Intersects(rast, the_geom)" +
            "       GROUP BY id, name;";
    
    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    ZoneRepository zoneRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List process(Map<String, String> config) {
        log.info("bufferRainProcessService CREATED");
        this.loadConfig(config);
        List<Long> zoneIds = this.runQuery();

        BufferStats stats = this.getStats();

        List<Report> reports = this.createReports(stats);
        return reports;
    }

    @Override
    public void loadConfig(Map<String, String> config) {
        tableName = config.get(INPUT_CONFIG_TABLENAME);
        threshold = config.get(INPUT_CONFIG_THRESHOLD);

        if(tableName == null || tableName.equals("") ||
           threshold == null || threshold.equals("") ) {

            throw new RuntimeException("CAMEL PROCESSOR INIT: Input config file" +
                    " missing property for process " + config.get(INPUT_CONFIG_PROCESS));
        }
        sql = sql.replace("${tableName}", tableName);
    }

    public List<Report> createReports(BufferStats stats) {
        List<Report> reports = new ArrayList<Report>();
        ListMultimap<User, BufferReportModel> multimap = ArrayListMultimap.create();
        for(User user: userRepository.findAll()) {
            for(UserZone userZone: user.getZones()) {
                Map<Integer, Map<String, PgRasterSummary>> zoneStat = stats.get(userZone.getZone().getId());
                if(zoneStat != null) {
                    if(zoneStat.get(userZone.getRadius()).get("lastrain").getMax() > userZone.getThreshold()) {
                        BufferReportModel reportModel = new BufferReportModel();

                        reportModel.setName(zoneStat.get(userZone.getRadius()).get("lastrain").getName());
                        reportModel.setSum03(String.valueOf((int)zoneStat.get(userZone.getRadius()).get("pluvio03h").getSum()));
                        reportModel.setSum06(String.valueOf((int)zoneStat.get(userZone.getRadius()).get("pluvio06h").getSum()));
                        reportModel.setRadius(userZone.getRadius());
                        reportModel.setThreshold(userZone.getThreshold());
                        reportModel.setId(userZone.getZone().getId());
                        multimap.put(user, reportModel);
                    }
                }
            }
        }

        // Create one report per user, mentionning all zones
        for(User user : multimap.keySet()) {
            UserZonesReport report = new UserZonesReport(user,  multimap.get(user));
            reports.add(report);
        }
        return reports;
    }

    private List<Long> runQuery() {
        List<Long> zones = new ArrayList<Long>();

        jdbcTemplate.query(
                sql, new Object[] {this.threshold}, new int[] {Types.DOUBLE},
                (rs, rowNum) -> rs.getLong("id")
        ).forEach(id -> zones.add(id));
        return zones;
    }

    /**
     * Get all stats for all zones, all buffer and 3 rasters
     * Structure is like
     * {
     *     5: { // zoneId
     *         30: { //buffer size
     *             lastrain: { // raster
     *               sum:10,
     *               max: 2
     *             },
     *             pluvio06h: {
     *               sum:10,
     *               max: 2
     *             }
     *         },
     *         50: {
     *             ..
     *         }
     *     },
     *     ...
     * }
     * @return
     */
    private  BufferStats getStats () {

        BufferStats stats = new BufferStats();
        for(int size: bufferSizes) {
            Map<String, List<PgRasterSummary>> bufferStats = new HashMap<>();
            for(String raster: rasters) {
                for(PgRasterSummary summary: runStatQuery("zones_buffer_" + size, raster)) {
                    if(stats.get(summary.getId()) == null) {
                        Map<Integer, Map<String, PgRasterSummary>> mapSizeKey = new HashMap<>();
                        for(int bSize: bufferSizes) {
                            Map<String, PgRasterSummary> mapRasterKey= new HashMap<>();
                            mapSizeKey.put(bSize, mapRasterKey);
                        }
                        stats.put(summary.getId(), mapSizeKey);
                    }
                    stats.get(summary.getId()).get(size).put(raster, summary);
                }
            }
        }
        return stats;
    }

    private List<PgRasterSummary> runStatQuery(String bufferTable, String rasterTable) {

        String sql = String.format(statSql, bufferTable, rasterTable);
        return jdbcTemplate.query(
                sql, new PgRasterSummaryRowMapper());
    }
}
