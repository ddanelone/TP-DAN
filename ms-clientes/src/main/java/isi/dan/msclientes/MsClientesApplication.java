package isi.dan.msclientes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import io.micrometer.core.aop.TimedAspect;
import io.micrometer.core.instrument.MeterRegistry;

@SpringBootApplication
@EnableDiscoveryClient
@EnableAspectJAutoProxy
public class MsClientesApplication {

   public static void main(String[] args) {
      SpringApplication.run(MsClientesApplication.class, args);
   }

   @Bean
   TimedAspect timedAspect(MeterRegistry registry) {
      return new TimedAspect(registry);
   }

}
