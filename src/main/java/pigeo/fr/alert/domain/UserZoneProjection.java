package pigeo.fr.alert.domain;

import org.springframework.data.rest.core.config.Projection;

/**
 * Created by florent on 23/05/18.
 */
@Projection(name = "flat" , types = UserZone.class)
public interface UserZoneProjection {
    int getThreshold();
    int getRadius();
    Zone getZone();
    User getUser();
}
