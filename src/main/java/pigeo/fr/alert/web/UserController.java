package pigeo.fr.alert.web;

import com.google.appengine.labs.repackaged.org.json.JSONArray;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.google.appengine.labs.repackaged.org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import pigeo.fr.alert.dao.UserZoneRepository;
import pigeo.fr.alert.domain.User;
import pigeo.fr.alert.domain.UserZone;
import pigeo.fr.alert.service.UserService;
import pigeo.fr.alert.service.ZoneService;

/**
 * Created by florent on 17/09/17.
 */

@RestController
@RequestMapping("/userZonescustom")
public class UserController {

    @Autowired
    ZoneService zoneService;

    @Autowired
    UserService userService;

    @Autowired
    UserZoneRepository userZoneRepository;

    @RequestMapping(value="/{id}", method = RequestMethod.PUT, consumes = {"application/json"}, produces="application/json")
    public HttpStatus update(@PathVariable("id") long id, @RequestBody String config) throws JSONException {


        JSONArray zones = new JSONArray(config);
        User user = userService.get(id);
        userZoneRepository.deleteByUser(user);

        for (int i = 0; i < zones.length(); i++) {
            JSONObject zone = zones.getJSONObject(i);
            UserZone userZone = new UserZone();
            userZone.setUser(user);
            userZone.setRadius(zone.getInt("radius"));
            userZone.setThreshold(zone.getInt("threshold"));
            userZone.setZone(zoneService.get(zone.getLong("id")));
            userZoneRepository.save(userZone);
        }

        return HttpStatus.OK;
    }

}
