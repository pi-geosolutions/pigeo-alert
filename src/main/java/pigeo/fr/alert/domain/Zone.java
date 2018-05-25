package pigeo.fr.alert.domain;

import com.vividsolutions.jts.geom.Point;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(
            mappedBy = "zone",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<UserZone> users = new ArrayList<>();

    public List<UserZone> getUsers() {
        return users;
    }

    public void setUsers(List<UserZone> users) {
        this.users = users;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


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
