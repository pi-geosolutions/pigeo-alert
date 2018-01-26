package pigeo.fr.alert.service;

import org.springframework.util.Assert;

import java.io.Serializable;

/**
 * Created by florent on 17/09/17.
 */
public class FormSearchCriteria implements Serializable {

    private static final long serialVersionUID = 1L;

    private String name;

    public FormSearchCriteria() {
    }

    public FormSearchCriteria(String name) {
        Assert.notNull(name, "Name must not be null");
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
