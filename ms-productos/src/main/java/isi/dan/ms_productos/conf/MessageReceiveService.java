package isi.dan.ms_productos.conf;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import isi.dan.ms_productos.dto.StockUpdateDTO;
import isi.dan.ms_productos.modelo.Producto;
import isi.dan.ms_productos.servicio.ProductoService;

@Service
public class MessageReceiveService {

   @Autowired
   private ProductoService productoService;

   private final ObjectMapper objectMapper = new ObjectMapper();

   @RabbitListener(queues = RabbitMQConfig.STOCK_UPDATE_QUEUE)
   public void receiveMessage(String message) {
      try {
         // Intentar deserializar el mensaje a StockUpdateDTO
         StockUpdateDTO stockUpdateDTO = objectMapper.readValue(message, StockUpdateDTO.class);
         Long idProducto = stockUpdateDTO.getIdProducto();
         Integer cantidad = stockUpdateDTO.getCantidad();

         Producto producto = productoService.getProductoById(idProducto);
         if (producto != null) {
            int stockActual = producto.getStockActual();
            int nuevoStock = stockActual + cantidad;
            producto.setStockActual(nuevoStock);

            // Guardar el producto actualizado en la base de datos
            productoService.saveProducto(producto);

            System.out.println("Producto actualizado en la base de datos: " + producto);
         } else {
            System.out.println("No se encontró producto con ID " + idProducto);
            // Manejar esta situación según los requerimientos de tu aplicación
         }
      } catch (JsonProcessingException e) {
         System.out.println("Error deserializando el mensaje: " + e.getMessage());
         // Loggear el mensaje malformado para revisar más tarde
         System.out.println("Mensaje malformado: " + message);
      } catch (Exception e) {
         System.out.println("Error procesando el mensaje: " + e.getMessage());
         e.printStackTrace();
      }
   }
}