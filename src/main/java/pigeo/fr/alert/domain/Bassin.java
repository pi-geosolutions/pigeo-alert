package pigeo.fr.alert.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vividsolutions.jts.geom.MultiPolygon;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by florent on 17/04/18.
 */

@Entity
@Table(name = "bassins")
public class Bassin {


    @Id
    @SequenceGenerator(name="bassin_generator", sequenceName="bassin_sequence", initialValue = 0)
    @GeneratedValue(generator = "bassin_generator")
    private long gid;

    private String maj_name;
    private String sub_name;
    private Double maj_bas;
    private Double sub_bas;
    private Double to_subbas;
    private Double maj_area;
    private Double sub_area;

    @Column
    @ManyToMany(mappedBy = "bassins")
    private Set<User> users = new HashSet<User>();

    @Column(columnDefinition = "MultiPolygon(Point, 4326)")
    private MultiPolygon the_geom;

    public long getGid() {
        return gid;
    }

    public void setGid(long gid) {
        this.gid = gid;
    }

    public String getMaj_name() {
        return maj_name;
    }

    public void setMaj_name(String maj_name) {
        this.maj_name = maj_name;
    }

    public String getSub_name() {
        return sub_name;
    }

    public void setSub_name(String sub_name) {
        this.sub_name = sub_name;
    }

    public Double getMaj_bas() {
        return maj_bas;
    }

    public void setMaj_bas(Double maj_bas) {
        this.maj_bas = maj_bas;
    }

    public Double getSub_bas() {
        return sub_bas;
    }

    public void setSub_bas(Double sub_bas) {
        this.sub_bas = sub_bas;
    }

    public Double getTo_subbas() {
        return to_subbas;
    }

    public void setTo_subbas(Double to_subbas) {
        this.to_subbas = to_subbas;
    }

    public Double getMaj_area() {
        return maj_area;
    }

    public void setMaj_area(Double maj_area) {
        this.maj_area = maj_area;
    }

    public Double getSub_area() {
        return sub_area;
    }

    public void setSub_area(Double sub_area) {
        this.sub_area = sub_area;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public MultiPolygon getThe_geom() {
        return the_geom;
    }

    public void setThe_geom(MultiPolygon the_geom) {
        this.the_geom = the_geom;
    }

    @PreRemove
    private void removeBassinsFromUsers() {
        for (User u : users) {
            u.getBassins().remove(this);
        }
    }

}
