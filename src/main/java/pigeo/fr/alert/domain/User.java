package pigeo.fr.alert.domain;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @SequenceGenerator(name="person_generator", sequenceName="person_sequence", initialValue = 23)
    @GeneratedValue(generator = "person_generator")
    private long id;

    private String firstName;
    private String lastName;

    private String username;
    private String password;
    private String passwordConfirm;

    @Column
    @ManyToMany
    private Set<Role> roles;

    @Column
    @ManyToMany
    private Set<AlertZone> zones;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Transient
    public String getPasswordConfirm() {
        return passwordConfirm;
    }

    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }

    @ManyToMany
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<AlertZone> getZones() {
        return zones;
    }

    public void setZones(Set<AlertZone> zones) {
        this.zones = zones;
    }

}
