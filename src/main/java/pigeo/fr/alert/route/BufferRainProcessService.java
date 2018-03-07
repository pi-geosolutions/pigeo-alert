package pigeo.fr.alert.route;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pigeo.fr.alert.dao.AlertZoneRepository;
import pigeo.fr.alert.dao.UserRepository;
import pigeo.fr.alert.domain.AlertZone;
import pigeo.fr.alert.domain.User;
import pigeo.fr.alert.report.Report;
import pigeo.fr.alert.service.ReportService;

import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static pigeo.fr.alert.route.Constants.*;

/**
 * Created by florent on 04/02/18.
 */

@Component("bufferRainProcessService")
@Transactional
public class BufferRainProcessService implements ProcessService {

    private static final Logger log = LoggerFactory.getLogger(BufferRainProcessService.class);

    private String imagePath;
    private String tableName;
    private String threshold;

    private String sql = "  WITH rast_buffer AS (" +
            "    SELECT (ST_DumpAsPolygons(rast)).*" +
            "    FROM rain_10x10, villes_buffer" +
            "    WHERE ST_Intersects(rast, the_geom)" +
            "  )" +
            "  select distinct(gid) from rast_buffer, villes_buffer" +
            "  where val > ? and ST_Intersects(geom, the_geom)" +
            "  group by val, gid;";

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    AlertZoneRepository alertZoneRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List process(Map<String, String> config) {
        log.info("bufferRainProcessService CREATED");
        this.loadConfig(config);
        List<Long> zoneIds = this.runQuery();
        for(Long id: zoneIds) {
            AlertZone zone = alertZoneRepository.findOne(id);
            List<User> users = userRepository.findByZones_Id(id);
            log.info(zone.getName());
        }
        return zoneIds;
    }

    @Override
    public void loadConfig(Map<String, String> config) {
        imagePath = config.get(INPUT_CONFIG_IMAGEPATH);
        tableName = config.get(INPUT_CONFIG_TABLENAME);
        threshold = config.get(INPUT_CONFIG_THRESHOLD);

        if(imagePath == null || imagePath.equals("") ||
           tableName == null || tableName.equals("") ||
           threshold == null || threshold.equals("") ) {

            throw new RuntimeException("CAMEL PROCESSOR INIT: Input config file" +
                    " missing property for process " + config.get(INPUT_CONFIG_PROCESS));
        }
    }

    private List<Long> runQuery() {
        List<Long> zones = new ArrayList<Long>();

        jdbcTemplate.query(
                sql, new Object[] {this.threshold}, new int[] {Types.DOUBLE},
                (rs, rowNum) -> rs.getLong("gid")
        ).forEach(gid -> zones.add(gid));
        return zones;
    }
}
