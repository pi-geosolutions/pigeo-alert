package pigeo.fr.alert;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;
import pigeo.fr.alert.domain.Bassin;
import pigeo.fr.alert.domain.UserZone;
import pigeo.fr.alert.domain.Zone;
import pigeo.fr.alert.domain.User;

/**
 * Created by florent on 05/02/18.
 */
@Configuration
public class ExposeEntityIdRestConfiguration extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(User.class);
        config.exposeIdsFor(Zone.class);
        config.exposeIdsFor(Bassin.class);
        config.exposeIdsFor(UserZone.class);
    }
}
