package pigeo.fr.alert.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.Repository;
import pigeo.fr.alert.domain.Form;

/**
 * Created by florent on 17/09/17.
 */
public interface FormRepository extends Repository<Form, Long> {

    Page<Form> findAll(Pageable pageable);

    Page<Form> findByNameContaining(String name, Pageable pageable);
    Form findByName(String name);

}
