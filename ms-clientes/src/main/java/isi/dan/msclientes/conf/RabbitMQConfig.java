package isi.dan.msclientes.conf;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

   public static final String CREAR_USUARIO_QUEUE = "crear_usuario";

   @Bean
   public Queue crearUsuarioQueue() {
      return new Queue(CREAR_USUARIO_QUEUE, true);
   }

   @Bean
   public AmqpTemplate amqpTemplate(ConnectionFactory connectionFactory) {
      return new RabbitTemplate(connectionFactory);
   }
}