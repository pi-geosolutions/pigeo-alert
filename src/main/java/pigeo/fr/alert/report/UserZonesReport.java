package pigeo.fr.alert.report;

import pigeo.fr.alert.domain.AlertZone;
import pigeo.fr.alert.domain.User;

import java.util.List;

/**
 * Created by florent on 07/03/18.
 */
public class UserZonesReport extends Report {

    private User user;
    private List<AlertZone> zones;

    public UserZonesReport(User user, List<AlertZone> zones) {
        super();
        this.user = user;
        this.zones = zones;
    }
}
