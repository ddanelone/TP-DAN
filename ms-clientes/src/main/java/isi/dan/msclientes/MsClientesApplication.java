package isi.dan.msclientes;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class MsClientesApplication {

   public static void main(String[] args) {
      SpringApplication.run(MsClientesApplication.class, args);
   }

}
