package pigeo.fr.alert.dao;

import com.vividsolutions.jts.geom.Point;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import pigeo.fr.alert.domain.AlertZone;

import java.util.List;

/**
 * Created by florent on 17/09/17.
 */

@RepositoryRestResource
public interface AlertZoneRepository extends CrudRepository<AlertZone, Long> {

    public List<AlertZone> findAll();

    @Query("select zone from AlertZone as zone where equals(zone.geom,:point) = TRUE")
    List<AlertZone> findByPoint(@Param("point") Point point);

}
