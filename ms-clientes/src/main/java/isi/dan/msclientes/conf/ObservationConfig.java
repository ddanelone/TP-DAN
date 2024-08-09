package isi.dan.msclientes.conf;

import io.micrometer.observation.ObservationRegistry;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ObservationConfig {
   @Bean
   ObservationRegistry observationRegistry() {
      return ObservationRegistry.create();
   }
}
