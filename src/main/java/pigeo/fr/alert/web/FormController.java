package pigeo.fr.alert.web;

import com.vividsolutions.jts.io.WKTWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import pigeo.fr.alert.dao.ZoneRepository;
import pigeo.fr.alert.domain.Zone;
import pigeo.fr.alert.service.FormService;

/**
 * Created by florent on 17/09/17.
 */

@RestController
public class FormController {

    @Autowired
    private FormService formService;

    @Autowired
    ZoneRepository zoneRepository;

    @GetMapping("/form")
    @ResponseBody
    @Transactional(readOnly = true)
    public Zone helloWorld() {

        WKTWriter w = new WKTWriter();
        Zone zone = zoneRepository.findOne(1l);
        return zone;
        //return this.formService.getForm("foo");
    }


}
