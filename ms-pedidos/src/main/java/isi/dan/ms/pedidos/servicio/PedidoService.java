package isi.dan.ms.pedidos.servicio;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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

   Logger log = LoggerFactory.getLogger(PedidoService.class);

   public Pedido savePedido(Pedido pedido) {
      for (DetallePedido dp : pedido.getDetalle()) {
         log.info("Enviando {}", dp.getProducto().getId() + ";" + dp.getCantidad());
         rabbitTemplate.convertAndSend(RabbitMQConfig.STOCK_UPDATE_QUEUE,
               dp.getProducto().getId() + ";" + dp.getCantidad());
      }
      return pedidoRepository.save(pedido);
   }

   public List<Pedido> getAllPedidos() {
      return pedidoRepository.findAll();
   }

   public Pedido getPedidoById(String id) {
      return pedidoRepository.findById(id).orElse(null);
   }

   public void deletePedido(String id) {
      pedidoRepository.deleteById(id);
   }

   // Método para agregar un cliente a un pedido
   public Pedido addClienteToPedido(String pedidoId, Cliente cliente) {
      Pedido pedido = getPedidoById(pedidoId);
      if (pedido != null) {
         Cliente savedCliente = clienteFeignClient.guardarCliente(cliente);
         pedido.setCliente(savedCliente);
         return pedidoRepository.save(pedido);
      }
      return null;
   }

   // Método para agregar un producto al detalle de un pedido
   public Pedido addProductoToDetalle(String pedidoId, DetallePedido detalle) {
      Pedido pedido = getPedidoById(pedidoId);
      if (pedido != null) {
         Producto savedProducto = productoFeignClient.agregarProducto(detalle.getProducto());
         detalle.setProducto(savedProducto);
         pedido.getDetalle().add(detalle);
         return pedidoRepository.save(pedido);
      }
      return null;
   }

   // Métodos para obtener clientes y productos por pedidoId usando Feign Clients
   public Cliente obtenerClientePorPedidoId(String pedidoId) {
      return clienteFeignClient.getClientes(pedidoId).get(0); // Ajusta esto según tu lógica
   }

   public List<Producto> obtenerProductoPorPedidoId(String pedidoId) {
      return productoFeignClient.getProductos(pedidoId);
   }
}
