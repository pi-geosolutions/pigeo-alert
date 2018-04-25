package pigeo.fr.alert.report;

import pigeo.fr.alert.domain.User;
import pigeo.fr.alert.report.entity.BassinReportModel;

import java.util.List;

/**
 * Created by florent on 28/04/18.
 */
public class UserBassinsReport extends Report {

    private List<BassinReportModel> bassins;

    public UserBassinsReport(User user, List<BassinReportModel> bassins) {
        super(user);
        this.bassins = bassins;
    }


    public List<BassinReportModel> getBassins() {
        return bassins;
    }

    @Override
    public String getMailTemplate() {
        return "template/bassin.html";
    }
}
