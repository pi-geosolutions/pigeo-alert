package pigeo.fr.alert.web;

import com.google.appengine.labs.repackaged.org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import pigeo.fr.alert.service.ZoneService;

/**
 * Created by florent on 17/09/17.
 */

@RestController
@RequestMapping("/zoness")
public class ZoneController {

    @Autowired
    ZoneService zoneService;

    @GetMapping(produces= MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @Transactional(readOnly = true)
    public String get() throws JSONException {
        return zoneService.toJson(zoneService.getAll()).toString();
    }

}
