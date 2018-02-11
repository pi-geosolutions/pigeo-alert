package pigeo.fr.alert.service;

import com.google.appengine.labs.repackaged.org.json.JSONArray;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.google.appengine.labs.repackaged.org.json.JSONObject;
import com.vividsolutions.jts.geom.Point;
import com.vividsolutions.jts.io.WKTWriter;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import pigeo.fr.alert.dao.AlertZoneRepository;
import pigeo.fr.alert.domain.AlertZone;
import pigeo.fr.alert.domain.Form;

import java.util.List;

/**
 * Created by florent on 12/02/18.
 */

@Component("zoneService")
@Transactional
public class ZoneService {

    private final AlertZoneRepository alertZoneRepository;

    public ZoneService(AlertZoneRepository alertZoneRepository) {
        this.alertZoneRepository = alertZoneRepository;
    }

    public AlertZone get(Long id) {
        return alertZoneRepository.findOne(id);
    }

    public List<AlertZone> getAll() {
        return alertZoneRepository.findAll();
    }

    public JSONObject toJson(AlertZone zone) throws JSONException {
        WKTWriter w = new WKTWriter();
        JSONObject obj = new JSONObject();
        Point p = zone.getGeom();
        obj.put("id", zone.getId());
        obj.put("name", zone.getName());
        obj.put("geom", w.write(p));
        return obj;
    }

    public JSONArray toJson(List<AlertZone> zones) throws JSONException {
        JSONArray a = new JSONArray();
        for(AlertZone zone: zones) {
            a.put(this.toJson(zone));
        }
        return a;
    }

    }
