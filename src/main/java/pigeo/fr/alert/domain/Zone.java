package pigeo.fr.alert.domain;

import com.vividsolutions.jts.geom.Point;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "zones")
public class Zone {


    @Id
    @SequenceGenerator(name="zone_generator", sequenceName="zone_sequence", initialValue = 23)
    @GeneratedValue(generator = "zone_generator")
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
    @ManyToMany(mappedBy = "zones")
    private Set<User> users = new HashSet<User>();

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

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    void add(User user) {
        this.users.add(user);
    }

    @PreRemove
    private void removeZonesFromUsers() {
        for (User u : users) {
            u.getZones().remove(this);
        }
    }

}
