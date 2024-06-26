package isi.dan.msclientes.conf;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

   public static final String CREAR_CLIENTE_QUEUE = "crear_cliente";

   @Bean
   public Queue crearClienteQueue() {
      return new Queue(CREAR_CLIENTE_QUEUE, true);
   }
}