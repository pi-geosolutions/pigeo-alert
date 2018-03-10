package pigeo.fr.alert.process;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import java.util.Map;

import static pigeo.fr.alert.route.Constants.INPUT_CONFIG_PROCESS;

/**
 * Created by florent on 04/02/18.
 */

@Component
public class ProcessFactory {

    @Autowired
    private ApplicationContext applicationContext;

    public ProcessService create(Map<String, String> config) {
        String type = config.get(INPUT_CONFIG_PROCESS);

        if(type == null || type.equals("")) {
            throw new RuntimeException("CAMEL PROCESSOR INIT: no type defined in config file");
        }

        try {
            ProcessService service = (ProcessService)applicationContext.getBean(type);
            return service;
        }
        catch (BeansException e) {
            throw new RuntimeException("CAMEL PROCESSOR INIT: no bean defined for type " + type);
        }
    }
}
