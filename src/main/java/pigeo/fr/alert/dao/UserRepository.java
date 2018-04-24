package pigeo.fr.alert.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pigeo.fr.alert.domain.User;
import java.util.List;

/**
 * Created by florent on 17/09/17.
 */

@RepositoryRestResource
public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);
    List<User> findByZones_Id(Long zoneId);
    List<User> findByBassins_Gid(Long bassinId);

}
