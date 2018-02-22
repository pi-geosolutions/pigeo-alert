package pigeo.fr.alert.route;

import org.apache.camel.LoggingLevel;
import org.apache.camel.builder.RouteBuilder;
import org.springframework.stereotype.Component;

/**
 * Created by florent on 04/02/18.
 */

@Component
public class MyRoute extends RouteBuilder {

    @Override
    public void configure() throws Exception {

        from("file:/home/florent/dev/test_camel")
                .convertBodyTo(String.class)
                .aggregate(constant(true)).completionFromBatchConsumer().groupExchanges()
                .bean(HandlerBean.class, "process")
                .split(exchangeProperty("ZONE_IDS"))
                    .log(LoggingLevel.INFO, "pigeo.fr.alert.route", "${body}")
                    .to("direct:sendMail")
                    .end()
        ;

        from("direct:sendMail")
                .setHeader("subject", constant("HELLO FLOW"))
                .setHeader("to", constant("florent.gravin@gmail.com"))
                .recipientList(simple("smtps://smtp.gmail.com:465?username=${property.smtpuser}&password=${property.smtppassword}")); //This works
    }
}