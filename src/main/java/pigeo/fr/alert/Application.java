package pigeo.fr.alert;

import com.bedatadriven.jackson.datatype.jts.JtsModule;
import com.fasterxml.jackson.databind.Module;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

@SpringBootApplication
public class Application {

    /** Trying to make geometry convertion working **/
    @Bean
    public ObjectMapper objectMapper(){
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JtsModule());
        return objectMapper;
    }
    @Bean
    public Module parameterNamesModule() {
        return new JtsModule();
    }
    /** ---- **/

    @Bean
    public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter(
            ObjectMapper objectMapper) {
        objectMapper.registerModule(new JtsModule());
        return new MappingJackson2HttpMessageConverter(objectMapper);
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
