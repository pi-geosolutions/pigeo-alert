package pigeo.fr.alert.report;

import pigeo.fr.alert.domain.Zone;
import pigeo.fr.alert.domain.User;

import java.util.List;

/**
 * Created by florent on 07/03/18.
 */
public class UserZonesReport extends Report {

    private User user;
    private List<Zone> zones;

    public UserZonesReport(User user, List<Zone> zones) {
        super();
        this.user = user;
        this.zones = zones;
    }

    public User getUser() {
        return user;
    }

    public List<Zone> getZones() {
        return zones;
    }
}
