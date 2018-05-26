package pigeo.fr.alert.report;

import pigeo.fr.alert.domain.Zone;
import pigeo.fr.alert.domain.User;
import pigeo.fr.alert.report.entity.BufferReportModel;

import java.util.List;

/**
 * Created by florent on 07/03/18.
 */
public class UserZonesReport extends Report {

    private List<BufferReportModel> models;

    public UserZonesReport(User user, List<BufferReportModel> models) {
        super(user);
        this.models = models;
    }

    public List<BufferReportModel> getZones() {
        return models;
    }

    @Override
    public String getMailTemplate() {
        return "template/buffer.html";
    }
}
