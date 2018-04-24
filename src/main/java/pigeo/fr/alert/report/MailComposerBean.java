package pigeo.fr.alert.report;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateExceptionHandler;
import freemarker.template.Version;
import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.StringWriter;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import static pigeo.fr.alert.route.Constants.ALERT_REPORT_PROPERTY;

/**
 * Created by florent on 10/03/18.
 */

@Component
@Configurable
public class MailComposerBean implements Processor {

    @Value(value = "classpath:template/mail.html")
    private static final String EMAIL_TEMPLATE = "template/mail.html";

    @Override
    public void process(Exchange exchange) throws Exception {

        Report report = exchange.getIn().getBody(Report.class);
        Map<String, Object> input = new HashMap<String, Object>();
        input.put("report", report);

        Configuration cfg = new Configuration();
        cfg.setIncompatibleImprovements(new Version(2, 3, 20));
        cfg.setClassForTemplateLoading(this.getClass(), "/");
        cfg.setDefaultEncoding("UTF-8");
        cfg.setLocale(Locale.US);
        cfg.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);
        StringWriter stringWriter = new StringWriter();
        Template template = cfg.getTemplate(report.getMailTemplate());
        template.process(input, stringWriter);

        exchange.getOut().setHeader("subject", "PADRE Vigilance warning");
        exchange.getOut().setHeader("to", report.getUser().getEmail());
        exchange.getOut().setBody(stringWriter.toString());
    }
}
