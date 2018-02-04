package pigeo.fr.alert.route;

import java.util.List;
import java.util.Map;

/**
 * Created by florent on 17/09/17.
 */
public interface ProcessService {

    List process(Map<String, String> config);

    void loadConfig(Map<String, String> config);
}
