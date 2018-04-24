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
import pigeo.fr.alert.domain.Zone;
import pigeo.fr.alert.report.Report;
import pigeo.fr.alert.report.UserZonesReport;
import pigeo.fr.alert.service.ReportService;

import java.sql.Types;
import java.util.ArrayList;
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

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    ZoneRepository zoneRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ReportService reportService;

    @Override
    public List process(Map<String, String> config) {
        log.info("bufferRainProcessService CREATED");
        this.loadConfig(config);
        List<Long> zoneIds = this.runQuery();

        List<Report> reports = this.createReports(zoneIds);
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

    public List<Report> createReports(List<Long> zoneIds) {
        List<Report> reports = new ArrayList<Report>();

        // Gather all zones concerned by user
        ListMultimap<User, Zone> multimap = ArrayListMultimap.create();
        for(Long id: zoneIds) {
            Zone zone = zoneRepository.findOne(id);
            List<User> users = userRepository.findByZones_Id(id);
            for(User user: users) {
                multimap.put(user, zone);
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
}
