package pigeo.fr.alert.service;

import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.ListMultimap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pigeo.fr.alert.dao.AlertZoneRepository;
import pigeo.fr.alert.dao.UserRepository;
import pigeo.fr.alert.domain.AlertZone;
import pigeo.fr.alert.domain.User;
import pigeo.fr.alert.report.Report;
import pigeo.fr.alert.report.UserZonesReport;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by florent on 12/03/18.
 */

@Component("reportService")
@Transactional
public class ReportService {

    @Autowired
    AlertZoneRepository alertZoneRepository;

    @Autowired
    UserRepository userRepository;

    public List<Report> createReports(List<Long> zoneIds) {
        List<Report> reports = new ArrayList<Report>();

        // Gather all zones concerned by user
        ListMultimap<User, AlertZone> multimap = ArrayListMultimap.create();
        for(Long id: zoneIds) {
            AlertZone zone = alertZoneRepository.findOne(id);
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

}
