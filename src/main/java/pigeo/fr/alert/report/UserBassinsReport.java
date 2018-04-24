package pigeo.fr.alert.report;

import pigeo.fr.alert.domain.Bassin;
import pigeo.fr.alert.domain.User;

import java.util.List;

/**
 * Created by florent on 28/04/18.
 */
public class UserBassinsReport extends Report {

    private List<Bassin> bassins;

    public UserBassinsReport(User user, List<Bassin> bassins) {
        super(user);
        this.bassins = bassins;
    }


    public List<Bassin> getBassins() {
        return bassins;
    }

    @Override
    public String getMailTemplate() {
        return "template/bassin.html";
    }
}
