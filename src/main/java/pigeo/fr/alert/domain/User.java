package pigeo.fr.alert.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @SequenceGenerator(name="user_generator", sequenceName="user_sequence", initialValue = 1)
    @GeneratedValue(generator = "user_generator")
    private long id;

    private String firstname;
    private String lastname;

    private String username;
    private String password;
    private String passwordConfirm;
    private String email;
    private String phone;

    @Column
    @ManyToMany
    private Set<Role> roles;

    @Column
    @ManyToMany
    @JoinTable(name = "users_zones", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "zone_id"))
    private Set<Zone> zones;

    @Column
    @ManyToMany
    @JoinTable(name = "users_bassins", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "bassin_gid"))
    private Set<Bassin> bassins;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    @JsonProperty
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    @Transient
    @JsonIgnore
    public String getPasswordConfirm() {
        return passwordConfirm;
    }

    @JsonProperty
    public void setPasswordConfirm(String passwordConfirm) {
        this.passwordConfirm = passwordConfirm;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @ManyToMany
    @JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public Set<Zone> getZones() {
        return zones;
    }
    public void setZones(Set<Zone> zones) {
        this.zones = zones;
    }

    public Set<Bassin> getBassins() {
        return bassins;
    }

    public void setBassins(Set<Bassin> bassins) {
        this.bassins = bassins;
    }

    @PreUpdate
    public void onPreUpdate () {
        // It's not real persistence, just keep trace of users were zone has been added
        for(Zone zone : zones)
            zone.add(this);
    }


}
