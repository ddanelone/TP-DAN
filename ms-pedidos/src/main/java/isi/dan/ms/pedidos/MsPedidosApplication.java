package isi.dan.ms.pedidos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients(basePackages = "isi.dan.ms.pedidos.feignClients")
public class MsPedidosApplication {

   public static void main(String[] args) {
      SpringApplication.run(MsPedidosApplication.class, args);
   }

}
