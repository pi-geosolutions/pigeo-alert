package pigeo.fr.alert.process;

import org.apache.camel.Processor;
import pigeo.fr.alert.report.Report;

import java.util.List;
import java.util.Map;

/**
 * Created by florent on 17/09/17.
 */
public interface ProcessService {

    List process(Map<String, String> config);

    void loadConfig(Map<String, String> config);

    List<Report> createReports(List<Long> ids);
}
