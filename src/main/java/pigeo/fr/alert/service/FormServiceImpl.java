package pigeo.fr.alert.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import pigeo.fr.alert.dao.FormRepository;
import pigeo.fr.alert.domain.Form;

/**
 * Created by florent on 17/09/17.
 */

@Component("formService")
@Transactional
public class FormServiceImpl implements FormService {

    private final FormRepository formRepository;

    public FormServiceImpl(FormRepository formRepository) {
        this.formRepository = formRepository;
    }

    public Page<Form> findForms(FormSearchCriteria criteria, Pageable pageable) {
        Assert.notNull(criteria, "Criteria must not be null");
        String name = criteria.getName();

        if (!StringUtils.hasLength(name)) {
            return this.formRepository.findAll(null);
        }

        return this.formRepository
                .findByNameContaining(name.trim(), pageable);
    }

    public Form getForm(String name) {
        return this.formRepository
                .findByName(name.trim());
    }
}
