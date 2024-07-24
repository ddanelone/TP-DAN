package isi.dan.msclientes.conf;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.simple.SimpleMeterRegistry;
import isi.dan.msclientes.servicios.ClienteService;

import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@Profile("test")
public class TestConfig {

   @Bean
   public MeterRegistry meterRegistry() {
      return new SimpleMeterRegistry();
   }

}
