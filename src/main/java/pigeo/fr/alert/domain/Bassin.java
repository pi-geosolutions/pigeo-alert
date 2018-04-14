package pigeo.fr.alert.domain;

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

    private String MAJ_NAME;
    private String SUB_NAME;
    private Double MAJ_BAS;
    private Double SUB_BAS;
    private Double TO_SUBBAS;
    private Double MAJ_AREA;
    private Double SUB_AREA;

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

    public String getMAJ_NAME() {
        return MAJ_NAME;
    }

    public void setMAJ_NAME(String MAJ_NAME) {
        this.MAJ_NAME = MAJ_NAME;
    }

    public String getSUB_NAME() {
        return SUB_NAME;
    }

    public void setSUB_NAME(String SUB_NAME) {
        this.SUB_NAME = SUB_NAME;
    }

    public Double getMAJ_BAS() {
        return MAJ_BAS;
    }

    public void setMAJ_BAS(Double MAJ_BAS) {
        this.MAJ_BAS = MAJ_BAS;
    }

    public Double getSUB_BAS() {
        return SUB_BAS;
    }

    public void setSUB_BAS(Double SUB_BAS) {
        this.SUB_BAS = SUB_BAS;
    }

    public Double getTO_SUBBAS() {
        return TO_SUBBAS;
    }

    public void setTO_SUBBAS(Double TO_SUBBAS) {
        this.TO_SUBBAS = TO_SUBBAS;
    }

    public Double getMAJ_AREA() {
        return MAJ_AREA;
    }

    public void setMAJ_AREA(Double MAJ_AREA) {
        this.MAJ_AREA = MAJ_AREA;
    }

    public Double getSUB_AREA() {
        return SUB_AREA;
    }

    public void setSUB_AREA(Double SUB_AREA) {
        this.SUB_AREA = SUB_AREA;
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
