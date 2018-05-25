package pigeo.fr.alert.service;

import com.google.appengine.labs.repackaged.org.json.JSONArray;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.google.appengine.labs.repackaged.org.json.JSONObject;
import com.vividsolutions.jts.geom.Point;
import com.vividsolutions.jts.io.WKTWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pigeo.fr.alert.dao.UserRepository;
import pigeo.fr.alert.dao.ZoneRepository;
import pigeo.fr.alert.domain.User;
import pigeo.fr.alert.domain.Zone;

import java.util.List;

/**
 * Created by florent on 12/02/18.
 */

@Component("userService")
@Transactional
public class UserService {

    @Autowired
    private ZoneRepository zoneRepository;

    @Autowired
    private UserRepository userRepository;


    public User get(Long id) {
        User user = userRepository.findOne(id);
        return user;
    }

    public List<Zone> getAll() {
        return zoneRepository.findAll();
    }

    public JSONObject toJson(Zone zone) throws JSONException {
        WKTWriter w = new WKTWriter();
        JSONObject obj = new JSONObject();
        Point p = zone.getGeom();
        obj.put("id", zone.getId());
        obj.put("name", zone.getName());
        obj.put("geom", w.write(p));
        return obj;
    }

    public JSONArray toJson(List<Zone> zones) throws JSONException {
        JSONArray a = new JSONArray();
        for(Zone zone: zones) {
            a.put(this.toJson(zone));
        }
        return a;
    }

    }
