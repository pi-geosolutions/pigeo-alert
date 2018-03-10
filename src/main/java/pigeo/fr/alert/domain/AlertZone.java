package pigeo.fr.alert.domain;

import com.vividsolutions.jts.geom.Point;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "zones")
public class AlertZone {


    @Id
    @SequenceGenerator(name="alertzone_generator", sequenceName="alertzone_sequence", initialValue = 23)
    @GeneratedValue(generator = "alertzone_generator")
    private long id;

    private String name;

    @Column(columnDefinition = "geometry(Point, 4326)")
    private Point geom;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Column
    @ElementCollection(targetClass=User.class)
    private Set<User> users;

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

    @ManyToMany(mappedBy = "alertZones")
    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

}
