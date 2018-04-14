package pigeo.fr.alert.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pigeo.fr.alert.domain.Bassin;

import java.util.List;

/**
 * Created by florent on 17/04/18.
 */

@RepositoryRestResource
public interface BassinRepository extends CrudRepository<Bassin, Long> {

    public List<Bassin> findAll();

}
