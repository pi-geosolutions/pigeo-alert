package pigeo.fr.alert.domain;

import javax.persistence.*;
import java.util.Objects;

/**
 * Created by florent on 19/05/18.
 */

@Entity
@Table(name = "user_zone_man")
public class UserZone {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "zone_id")
    private Zone zone;

    @Column
    private int threshold = 0;

    @Column
    private int radius = 0;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Zone getZone() {
        return zone;
    }

    public void setZone(Zone zone) {
        this.zone = zone;
    }

    public int getThreshold() {
        return threshold;
    }

    public void setThreshold(int threshold) {
        this.threshold = threshold;
    }

    public int getRadius() {
        return radius;
    }

    public void setRadius(int radius) {
        this.radius = radius;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        UserZone that = (UserZone) o;
        return Objects.equals(user, that.user) &&
                Objects.equals(zone, that.zone);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, zone);
    }}
