package pigeo.fr.alert.report;

import pigeo.fr.alert.domain.User;

/**
 * Created by florent on 28/04/18.
 */
public abstract class Report {

    private User user;

    public Report(User user) {
        super();
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public abstract String getMailTemplate();

}
