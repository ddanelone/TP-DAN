package isi.dan.msclientes.conf;

import com.fasterxml.jackson.databind.ObjectMapper;

import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.servicios.ClienteService;

import java.math.BigDecimal;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ClienteMessageListener {

   @Autowired
   private ClienteService clienteService;

   @Autowired
   private ObjectMapper objectMapper;

   @Value("${cliente.maximo_descubierto.default}")
   private BigDecimal defaultMaximoDescubierto;

   @RabbitListener(queues = RabbitMQConfig.CREAR_CLIENTE_QUEUE)
   public void receiveMessage(String message) {
      try {
         // Convertir el mensaje JSON a un objeto Cliente
         Cliente cliente = objectMapper.readValue(message, Cliente.class);

         // Establecer el valor por defecto para maximoDescubierto si no se proporcionó
         if (cliente.getMaximoDescubierto() == null || cliente.getMaximoDescubierto().compareTo(BigDecimal.ZERO) == 0) {
            cliente.setMaximoDescubierto(defaultMaximoDescubierto);
         }

         // Guardar el cliente en la base de datos
         clienteService.save(cliente);
         System.out.println("Cliente creado: " + cliente);
      } catch (Exception e) {
         System.err.println("Error al procesar el mensaje: " + e.getMessage());
      }
   }
}