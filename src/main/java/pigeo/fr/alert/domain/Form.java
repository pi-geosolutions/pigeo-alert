package pigeo.fr.alert.domain;

import javax.persistence.*;

/**
 * Created by florent on 17/09/17.
 */

@Entity
public class Form {

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name="form_generator", sequenceName="form_sequence", initialValue = 23)
    @GeneratedValue(generator = "form_generator")
    private Long id;

    @Column(nullable = false)
    private String name;

    public String getName() {
        return this.name;
    }

    @Override
    public String toString() {
        return getName();
    }


}



