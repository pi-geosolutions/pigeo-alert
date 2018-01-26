package pigeo.fr.alert.web;

import com.vividsolutions.jts.geom.Point;
import com.vividsolutions.jts.io.WKTReader;
import com.vividsolutions.jts.io.WKTWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import pigeo.fr.alert.dao.AlertZoneRepository;
import pigeo.fr.alert.domain.AlertZone;
import pigeo.fr.alert.domain.Form;
import pigeo.fr.alert.service.FormService;

/**
 * Created by florent on 17/09/17.
 */

@RestController
public class FormController {

    @Autowired
    private FormService formService;

    @Autowired
    AlertZoneRepository alertZoneRepository;

    @GetMapping("/form")
    @ResponseBody
    @Transactional(readOnly = true)
    public String helloWorld() {

        WKTWriter w = new WKTWriter();
        AlertZone zone = alertZoneRepository.findOne(1l);
        Point p = zone.getGeom();
        return w.write(p);

        //return this.formService.getForm("foo");
    }


}
