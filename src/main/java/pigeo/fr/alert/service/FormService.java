package pigeo.fr.alert.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pigeo.fr.alert.domain.Form;

/**
 * Created by florent on 17/09/17.
 */
public interface FormService {

    Page<Form> findForms(FormSearchCriteria criteria, Pageable pageable);

    Form getForm(String name);

}
