package pigeo.fr.alert.dao;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.transaction.annotation.Transactional;
import pigeo.fr.alert.domain.User;
import pigeo.fr.alert.domain.UserZone;
import pigeo.fr.alert.domain.UserZoneProjection;

import java.util.List;

/**
 * Created by florent on 17/09/17.
 */

@RepositoryRestResource(excerptProjection = UserZoneProjection.class)
public interface UserZoneRepository extends CrudRepository<UserZone, Long> {

    @Modifying
    @Transactional
    void deleteByUser(User user);
}
