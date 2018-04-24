package pigeo.fr.alert.report;

import pigeo.fr.alert.domain.Zone;
import pigeo.fr.alert.domain.User;

import java.util.List;

/**
 * Created by florent on 07/03/18.
 */
public class UserZonesReport extends Report {

    private List<Zone> zones;

    public UserZonesReport(User user, List<Zone> zones) {
        super(user);
        this.zones = zones;
    }

    public List<Zone> getZones() {
        return zones;
    }

    @Override
    public String getMailTemplate() {
        return "template/buffer.html";
    }
}
