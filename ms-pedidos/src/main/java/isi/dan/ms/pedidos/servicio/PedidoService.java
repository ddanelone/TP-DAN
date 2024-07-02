package isi.dan.ms.pedidos.servicio;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import io.micrometer.observation.Observation;
import io.micrometer.observation.ObservationRegistry;

import isi.dan.ms.pedidos.conf.RabbitMQConfig;
import isi.dan.ms.pedidos.dao.PedidoRepository;
import isi.dan.ms.pedidos.feignClients.ClienteFeignClient;
import isi.dan.ms.pedidos.feignClients.ProductoFeignClient;
import isi.dan.ms.pedidos.modelo.Cliente;
import isi.dan.ms.pedidos.modelo.DetallePedido;
import isi.dan.ms.pedidos.modelo.Pedido;
import isi.dan.ms.pedidos.modelo.Producto;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PedidoService {

   @Autowired
   private PedidoRepository pedidoRepository;

   @Autowired
   private RabbitTemplate rabbitTemplate;

   @Autowired
   private ClienteFeignClient clienteFeignClient;

   @Autowired
   private ProductoFeignClient productoFeignClient;

   @Autowired
   private RestTemplate restTemplate;

   @Autowired
   private SequenceGeneratorService sequenceGeneratorService;

   Logger log = LoggerFactory.getLogger(PedidoService.class);

   @Autowired
   private ObservationRegistry observationRegistry;

   public Pedido savePedido(Pedido pedido) {
      return Observation.createNotStarted("pedido.save", observationRegistry)
            .observe(() -> {
               for (DetallePedido dp : pedido.getDetalle()) {
                  log.info("Enviando {}", dp.getProducto().getId() + ";" + dp.getCantidad());
                  rabbitTemplate.convertAndSend(RabbitMQConfig.STOCK_UPDATE_QUEUE,
                        dp.getProducto().getId() + ";" + dp.getCantidad());
               }
               if (pedido.getNumeroPedido() == null) {
                  pedido.setNumeroPedido((int) sequenceGeneratorService.generateSequence(Pedido.SEQUENCE_NAME));
               }
               return pedidoRepository.save(pedido);
            });
   }

   public List<Pedido> getAllPedidos() {
      return Observation.createNotStarted("pedido.getAll", observationRegistry)
            .observe(() -> pedidoRepository.findAll());
   }

   public Pedido getPedidoById(String id) {
      return Observation.createNotStarted("pedido.getById", observationRegistry)
            .observe(() -> pedidoRepository.findById(id).orElse(null));
   }

   public void deletePedido(String id) {
      Observation.createNotStarted("pedido.delete", observationRegistry)
            .observe(() -> pedidoRepository.deleteById(id));
   }

   public Pedido addClienteToPedido(String pedidoId, Cliente cliente) {
      return Observation.createNotStarted("pedido.addCliente", observationRegistry)
            .observe(() -> {
               Pedido pedido = getPedidoById(pedidoId);
               if (pedido != null) {
                  try {
                     Cliente savedCliente = clienteFeignClient.guardarCliente(cliente);
                     pedido.setCliente(savedCliente);
                     return pedidoRepository.save(pedido);
                  } catch (Exception e) {
                     log.error("Error al agregar cliente al pedido: {}", e.getMessage());
                  }
               }
               return null;
            });
   }

   public Pedido addProductoToDetalle(String pedidoId, DetallePedido detalle) {
      return Observation.createNotStarted("pedido.addProducto", observationRegistry)
            .observe(() -> {
               Pedido pedido = getPedidoById(pedidoId);
               log.info("DetallePedido recibido: {}", detalle);
               log.info("Pedido id: {}", pedidoId);
               log.info("Pedido: {}", pedido);
               if (pedido != null) {
                  try {
                     Producto savedProducto = productoFeignClient.agregarProducto(detalle.getProducto());
                     detalle.setProducto(savedProducto);
                     pedido.getDetalle().add(detalle);
                     Pedido updatedPedido = pedidoRepository.save(pedido);
                     if (updatedPedido != null) {
                        log.info("Pedido después de agregar detalle: {}", updatedPedido);
                     } else {
                        log.warn("No se pudo actualizar el pedido");
                     }
                     return updatedPedido;
                  } catch (Exception e) {
                     log.error("Error al agregar producto al detalle del pedido: {}", e.getMessage());
                  }
               }
               return null;
            });
   }

   public Cliente obtenerClientePorPedidoId(Integer clienteId) {
      return Observation.createNotStarted("pedido.obtenerClientePorPedidoId", observationRegistry)
            .observe(() -> {
               String url = "http://ms-clientes/api/clientes/" + clienteId;
               try {
                  return restTemplate.getForObject(url, Cliente.class);
               } catch (Exception e) {
                  log.error("Error al obtener cliente por ID: {}", e.getMessage());
                  return null;
               }
            });
   }

   public List<Producto> obtenerProductosPorIds(List<String> productoIds) {
      return Observation.createNotStarted("pedido.obtenerProductosPorIds", observationRegistry)
            .observe(() -> {
               String ids = String.join(",", productoIds);
               String url = "http://ms-productos/api/productos?ids=" + ids;
               try {
                  return restTemplate.getForObject(url, List.class);
               } catch (Exception e) {
                  log.error("Error al obtener productos por IDs: {}", e.getMessage());
                  return null;
               }
            });
   }
}
