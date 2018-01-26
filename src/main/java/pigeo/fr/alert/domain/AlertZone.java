package pigeo.fr.alert.domain;

import com.vividsolutions.jts.geom.Point;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Table(name = "zones")
public class AlertZone {

    @Id
    @SequenceGenerator(name="alertzone_generator", sequenceName="alertzone_sequence", initialValue = 23)
    @GeneratedValue(generator = "alertzone_generator")
    private long id;

    private String name;

    //@Type(type = "jts_geometry")
    @Column(columnDefinition = "geometry(Point,4326)")
    private Point geom;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Point getGeom() {
        return geom;
    }

    public void setGeom(Point geom) {
        this.geom = geom;
    }
}
