package isi.dan.ms.pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import isi.dan.ms.pedidos.modelo.Cliente;
import isi.dan.ms.pedidos.modelo.DetallePedido;
import isi.dan.ms.pedidos.modelo.Pedido;
import isi.dan.ms.pedidos.modelo.Producto;
import isi.dan.ms.pedidos.servicio.PedidoService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

   @Autowired
   private PedidoService pedidoService;

   @PostMapping
   public ResponseEntity<Pedido> createPedido(@RequestBody Pedido pedido) {
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
      // acá no pasa
      System.out.println("pedido:" + updatedPedido.toString());
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
      return new ResponseEntity("No se puedo agregar el cliente al pedido", HttpStatus.OK);
   }

   private ResponseEntity<List<Producto>> fallbackGetProductos(@PathVariable("pedidoId") String pedidoId, Throwable e) {
      // Puedes personalizar la lista de productos que devuelves en el fallback
      return new ResponseEntity<>(new ArrayList<>(), HttpStatus.OK);
   }

   private ResponseEntity<Cliente> fallbackSaveCliente(@PathVariable("pedidoId") String pedidoId,
         @RequestBody Cliente cliente,
         Throwable e) {
      return new ResponseEntity("El cliente es demasiado pobre para hacer este pedido.", HttpStatus.OK);
   }

   private ResponseEntity<Producto> fallbackSaveProducto(@PathVariable("pedidoId") String pedidoId,
         @RequestBody Producto producto,
         Throwable e) {
      return new ResponseEntity("Los prductos no se pueden agregar al pedido.", HttpStatus.OK);

   }

}
