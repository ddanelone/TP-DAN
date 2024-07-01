package isi.dan.ms.pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import isi.dan.ms.pedidos.MessageSenderService;
import isi.dan.ms.pedidos.conf.RabbitMQConfig;
import isi.dan.ms.pedidos.dto.StockUpdateDTO;
import isi.dan.ms.pedidos.modelo.Cliente;
import isi.dan.ms.pedidos.modelo.DetallePedido;
import isi.dan.ms.pedidos.modelo.EstadoCambioRequest;
import isi.dan.ms.pedidos.modelo.Pedido;
import isi.dan.ms.pedidos.modelo.Producto;
import isi.dan.ms.pedidos.servicio.PedidoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

   @Autowired
   private PedidoService pedidoService;

   Logger log = LoggerFactory.getLogger(PedidoService.class);

   @Autowired
   private MessageSenderService messageSenderService;

   @PostMapping
   public ResponseEntity<Pedido> createPedido(@RequestBody Pedido pedido) {
      // Verificar stock para cada producto en el pedido
      for (DetallePedido detalle : pedido.getDetalle()) {
         log.info("Producto {} tiene suficiente stock. Agregando al pedido.", detalle.getProducto().getNombre());
         // Enviar mensaje a RabbitMQ para actualizar stock
         StockUpdateDTO stockUpdateDTO = new StockUpdateDTO();
         stockUpdateDTO.setIdProducto(detalle.getProducto().getId());
         stockUpdateDTO.setCantidad(detalle.getCantidad());
         messageSenderService.sendMessage(RabbitMQConfig.STOCK_UPDATE_QUEUE, stockUpdateDTO);
      }

      // Guardar el pedido con los detalles que tienen suficiente stock
      Pedido savedPedido = pedidoService.savePedido(pedido);
      return ResponseEntity.ok(savedPedido);
   }

   @GetMapping
   public List<Pedido> getAllPedidos() {
      return pedidoService.getAllPedidos();
   }

   @GetMapping("/{id}")
   public ResponseEntity<Pedido> getPedidoById(@PathVariable String id) {
      Pedido pedido = pedidoService.getPedidoById(id);
      return pedido != null ? ResponseEntity.ok(pedido) : ResponseEntity.notFound().build();
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<Void> deletePedido(@PathVariable String id) {
      pedidoService.deletePedido(id);
      return ResponseEntity.noContent().build();
   }

   @Retry(name = "clientesRetry")
   @PostMapping("/{id}/cliente")
   @CircuitBreaker(name = "clientesCB", fallbackMethod = "fallbackSaveCliente")
   public ResponseEntity<Pedido> addClienteToPedido(@PathVariable String id, @RequestBody Cliente cliente) {
      Pedido updatedPedido = pedidoService.addClienteToPedido(id, cliente);
      return ResponseEntity.ok(updatedPedido);
   }

   @Retry(name = "productosRetry")
   @PostMapping("/{id}/detalle")
   @CircuitBreaker(name = "productosCB", fallbackMethod = "fallbackSaveProducto")
   public ResponseEntity<Pedido> addProductoToDetalle(@PathVariable String id, @RequestBody DetallePedido detalle) {
      Pedido updatedPedido = pedidoService.addProductoToDetalle(id, detalle);
      log.info("Pedido después de agregar detalle: {} ", updatedPedido);
      return ResponseEntity.ok(updatedPedido);
   }

   @Retry(name = "productosRetry")
   @GetMapping("/productos/{pedidoId}")
   @CircuitBreaker(name = "productosCB", fallbackMethod = "fallbackGetProductos")
   public ResponseEntity<List<Producto>> getProductos(@PathVariable("pedidoId") String pedidoId) {
      Pedido pedido = pedidoService.getPedidoById(pedidoId);
      if (pedido == null) {
         return ResponseEntity.notFound().build();
      }
      List<String> productoIds = pedido.getDetalle().stream()
            .map(detalle -> detalle.getProducto().getId().toString())
            .collect(Collectors.toList());
      List<Producto> productos = pedidoService.obtenerProductosPorIds(productoIds);
      return ResponseEntity.ok(productos);
   }

   @Retry(name = "clientesRetry")
   @GetMapping("/clientes/{pedidoId}")
   @CircuitBreaker(name = "clientesCB", fallbackMethod = "fallbackGetClientes")
   public ResponseEntity<Cliente> getCliente(@PathVariable("pedidoId") String pedidoId) {
      Pedido pedido = pedidoService.getPedidoById(pedidoId);
      if (pedido == null) {
         return ResponseEntity.notFound().build();
      }
      Cliente cliente = pedidoService.obtenerClientePorPedidoId(pedido.getCliente().getId());
      return ResponseEntity.ok(cliente);
   }

   private ResponseEntity<Cliente> fallbackGetClientes(@PathVariable("pedidoId") String pedidoId, Throwable e) {
      log.error("Error al obtener cliente para pedido {}: {}", pedidoId, e.getMessage());
      return new ResponseEntity("No se pudo obtener el cliente para el pedido", HttpStatus.OK);
   }

   private ResponseEntity<List<Producto>> fallbackGetProductos(@PathVariable("pedidoId") String pedidoId, Throwable e) {
      log.error("Error al obtener productos para pedido {}: {}", pedidoId, e.getMessage());
      return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
   }

   private ResponseEntity<Cliente> fallbackSaveCliente(@PathVariable("id") String id, @RequestBody Cliente cliente,
         Throwable e) {
      log.error("Error al guardar cliente para pedido {}: {}", id, e.getMessage());
      return new ResponseEntity("No se pudo guardar el cliente para el pedido", HttpStatus.OK);
   }

   private ResponseEntity<Pedido> fallbackSaveProducto(@PathVariable("id") String id,
         @RequestBody DetallePedido detalle, Throwable e) {
      log.error("Error al guardar producto para pedido {}: {}", id, e.getMessage());
      return new ResponseEntity("No se pudo guardar el producto para el pedido", HttpStatus.OK);
   }

   // Método para actualizar el ESTADO del pedido
   @PutMapping("/{id}/estado")
   public ResponseEntity<Pedido> updatePedidoEstado(@PathVariable String id, @RequestBody EstadoCambioRequest request) {
      Pedido pedido = pedidoService.getPedidoById(id);

      if (pedido != null) {
         pedido.setEstado(request.getNuevoEstado());
         pedido.addEstadoCambio(request.getNuevoEstado(), request.getUsuarioCambio());
         Pedido updatedPedido = pedidoService.savePedido(pedido);
         return ResponseEntity.ok(updatedPedido);
      } else {
         return ResponseEntity.notFound().build();
      }
   }

}