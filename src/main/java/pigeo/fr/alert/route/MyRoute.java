package pigeo.fr.alert.route;

import org.apache.camel.LoggingLevel;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;
import pigeo.fr.alert.report.MailComposerBean;

import static pigeo.fr.alert.route.Constants.ALERT_REPORT_PROPERTY;

/**
 * Created by florent on 04/02/18.
 */

@Component
public class MyRoute extends RouteBuilder {

    @Override
    public void configure() throws Exception {

        from("file:/padre/geodata/pi-alert/scan/")
                .convertBodyTo(String.class)
                .aggregate(constant(true)).completionFromBatchConsumer().groupExchanges()
                .bean(HandlerBean.class, "process")
                .split(exchangeProperty(ALERT_REPORT_PROPERTY))
                    .log(LoggingLevel.INFO, "pigeo.fr.alert.route", "${body}")
                    .to("direct:sendMail")
                    .end()
        ;

        from("direct:sendMail")
                .bean(MailComposerBean.class, "process")
                .recipientList(simple("smtps://smtp.gmail.com:465?username=${property.smtpuser}&password=${property.smtppassword}&contentType=text/html")); //This works
    }
}