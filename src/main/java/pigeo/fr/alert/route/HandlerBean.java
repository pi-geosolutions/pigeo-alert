package pigeo.fr.alert.route;

import org.apache.camel.Exchange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import pigeo.fr.alert.service.FormService;

import java.io.BufferedReader;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static pigeo.fr.alert.route.Constants.INPUT_CONFIG_SPERATOR;

/**
 * Created by florent on 04/02/18.
 */

@Component
@Configurable
public class HandlerBean implements org.apache.camel.Processor {

    @Autowired
    private ProcessFactory processFactory;

    @Autowired
    private BufferRainProcessService bufferRainProcessService;

    @Override
    public void process(Exchange exchange) throws Exception {
        ArrayList<Exchange> grouped =
                exchange.getProperty(Exchange.GROUPED_EXCHANGE, ArrayList.class);


        // List all files in route input folder
        for (Exchange exch : grouped) {

            String config = exch.getIn().getBody(String.class);
            BufferedReader bufReader = new BufferedReader(new StringReader(config));

            Map<String, String> props = new HashMap<String, String>();
            String line = null;

            // Read config files properties and set props map
            while( (line = bufReader.readLine()) != null ) {
                if(line.length() == 0 || line.equals("")) {
                    break;
                }
                String[] tokens = line.split(INPUT_CONFIG_SPERATOR);
                if(tokens.length != 2) {
                    throw new RuntimeException("CAMEL PROCESSOR INIT: Input config file format is not valid");
                }
                props.put(tokens[0], tokens[1]);

                // persist properties in camel exchange
                exchange.setProperty(tokens[0], tokens[1]);
            }

            ProcessService service = processFactory.create(props);
            List ids = service.process(props);
            ids.add(3);
            exchange.setProperty("ZONE_IDS", ids);
        }
    }
}
