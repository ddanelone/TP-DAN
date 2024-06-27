package isi.dan.msclientes.conf;

import com.fasterxml.jackson.databind.ObjectMapper;

import isi.dan.msclientes.model.UsuarioHabilitado;
import isi.dan.msclientes.servicios.UsuarioHabilitadoService;

import java.math.BigDecimal;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ClienteMessageListener {

   @Autowired
   private UsuarioHabilitadoService usuarioHabilitadoService;

   @Autowired
   private ObjectMapper objectMapper;

   @RabbitListener(queues = RabbitMQConfig.CREAR_CLIENTE_QUEUE)
   public void receiveMessage(String message) {
      try {
         // Convertir el mensaje JSON a un objeto Cliente
         UsuarioHabilitado usuarioHabilitado = objectMapper.readValue(message, UsuarioHabilitado.class);

         // Guardar el cliente en la base de datos
         usuarioHabilitadoService.save(usuarioHabilitado);
         System.out.println("UsuarioHabilitado: " + usuarioHabilitado);
      } catch (Exception e) {
         System.err.println("Error al procesar el mensaje: " + e.getMessage());
      }
   }
}