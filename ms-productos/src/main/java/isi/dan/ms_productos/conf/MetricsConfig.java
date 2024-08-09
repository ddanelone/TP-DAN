package isi.dan.ms_productos.conf;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.simple.SimpleMeterRegistry;
import io.micrometer.prometheus.PrometheusConfig;
import io.micrometer.prometheus.PrometheusMeterRegistry;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MetricsConfig {

   @Bean
   public PrometheusMeterRegistry prometheusMeterRegistry() {
      return new PrometheusMeterRegistry(PrometheusConfig.DEFAULT);
   }

   @Bean
   public MeterRegistry meterRegistry() {
      return new SimpleMeterRegistry();
   }
}