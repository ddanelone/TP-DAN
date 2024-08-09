package isi.dan.ms_productos.conf;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import isi.dan.ms_productos.dto.StockUpdateDTO;
import isi.dan.ms_productos.modelo.Producto;
import isi.dan.ms_productos.servicio.ProductoService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class MessageReceiveService {

   @Autowired
   private ProductoService productoService;

   private final ObjectMapper objectMapper = new ObjectMapper();

   private static final Logger log = LoggerFactory.getLogger(MessageReceiveService.class);

   @RabbitListener(queues = RabbitMQConfig.STOCK_UPDATE_QUEUE)
   public void receiveMessage(String message) {
      try {
         // Intentar deserializar el mensaje a StockUpdateDTO
         StockUpdateDTO stockUpdateDTO = objectMapper.readValue(message, StockUpdateDTO.class);
         Long idProducto = stockUpdateDTO.getIdProducto();
         Integer cantidad = stockUpdateDTO.getCantidad();
         log.info("Cantidad recibida para agregar: {}", cantidad);

         Producto producto = productoService.getProductoById(idProducto);
         if (producto != null) {
            int stockActual = producto.getStockActual();
            log.info("Stock actual del producto: {}", stockActual);
            int nuevoStock = stockActual + cantidad;
            producto.setStockActual(nuevoStock);

            // Guardar el producto actualizado en la base de datos
            productoService.saveProducto(producto);
            log.info("Producto actualizado en la base de datos: {}", producto);

         } else {
            log.info("No se encontró producto con ID : {}", idProducto);
         }
      } catch (JsonProcessingException e) {
         log.error("Error deserializando el mensaje: {}", e.getMessage());
      } catch (Exception e) {
         log.error("Error procesando el mensaje: {}", e.getMessage());
         e.printStackTrace();
      }
   }
}