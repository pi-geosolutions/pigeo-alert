package pigeo.fr.alert.domain;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

/**
 * Created by florent on 19/05/18.
 */

@Embeddable
public class UserZoneId implements Serializable {

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "zone_id")
    private Long zoneId;

    private UserZoneId() {}

    public UserZoneId(Long userId, Long zoneId) {
        this.userId = userId;
        this.zoneId = zoneId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getZoneId() {
        return zoneId;
    }

    public void setZoneId(Long zoneId) {
        this.zoneId = zoneId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        UserZoneId that = (UserZoneId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(zoneId, that.zoneId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, zoneId);
    }

}
