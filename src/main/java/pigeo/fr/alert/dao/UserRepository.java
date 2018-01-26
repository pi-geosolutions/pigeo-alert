package pigeo.fr.alert.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pigeo.fr.alert.domain.User;

/**
 * Created by florent on 17/09/17.
 */

@RepositoryRestResource
public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);

}
