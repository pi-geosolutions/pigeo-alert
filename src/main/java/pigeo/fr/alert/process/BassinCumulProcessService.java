package pigeo.fr.alert.process;

import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.ListMultimap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pigeo.fr.alert.dao.BassinRepository;
import pigeo.fr.alert.dao.UserRepository;
import pigeo.fr.alert.domain.Bassin;
import pigeo.fr.alert.domain.User;
import pigeo.fr.alert.report.Report;
import pigeo.fr.alert.report.UserBassinsReport;

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
public class BassinCumulProcessService implements ProcessService {

    private static final Logger log = LoggerFactory.getLogger(BassinCumulProcessService.class);

    public final String TABLE_NAME = "bassins";

    private String tableName;
    private String threshold;

    private String sql = "WITH bassin_rain AS (" +
            "   SELECT (ST_DumpAsPolygons(rast)).*, gid" +
            "   FROM ${tableName}, " + TABLE_NAME + " " +
            "   WHERE ST_Intersects(rast, the_geom)" +
            ")" +
            "SELECT  gid, " +
            "   sum(ST_area(ST_Transform(geom, 3857))) as area " +
            "   FROM bassin_rain" +
            "   WHERE val > ?" +
            "   GROUP BY gid ;";
            

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    BassinRepository bassinRepository;
    
    @Override
    public List process(Map<String, String> config) {
        log.info("bassinCumulProcessService CREATED");
        this.loadConfig(config);
        List<Long> bassinIds = this.runQuery();

        List<Report> reports = this.createReports(bassinIds);
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

    @Override
    public List<Report> createReports(List<Long> bassinIds) {
        List<Report> reports = new ArrayList<Report>();

        // Gather all bassins concerned by user
        ListMultimap<User, Bassin> multimap = ArrayListMultimap.create();
        for(Long id: bassinIds) {
            Bassin bassin = bassinRepository.findOne(id);
            List<User> users = userRepository.findByBassins_Gid(id);
            for(User user: users) {
                multimap.put(user, bassin);
            }
        }

        // Create one report per user, mentionning all bassins
        for(User user : multimap.keySet()) {
            UserBassinsReport report = new UserBassinsReport(user,  multimap.get(user));
            reports.add(report);
        }
        return reports;
    }

    private List<Long> runQuery() {
        List<Long> bassins = new ArrayList<Long>();

        jdbcTemplate.query(
                sql, new Object[] {this.threshold}, new int[] {Types.DOUBLE},
                (rs, rowNum) -> rs.getLong("gid")
        ).forEach(id -> bassins.add(id));
        return bassins;
    }
}
