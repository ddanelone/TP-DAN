package isi.dan.ms.pedidos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import isi.dan.ms.pedidos.modelo.Cliente;
import isi.dan.ms.pedidos.modelo.DetallePedido;
import isi.dan.ms.pedidos.modelo.Pedido;
import isi.dan.ms.pedidos.modelo.Producto;
import isi.dan.ms.pedidos.servicio.PedidoService;

import java.util.List;

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

   // Nuevo endpoint para guardar un cliente en un pedido
   @PostMapping("/{id}/cliente")
   public ResponseEntity<Pedido> addClienteToPedido(@PathVariable String id, @RequestBody Cliente cliente) {
      Pedido updatedPedido = pedidoService.addClienteToPedido(id, cliente);
      return ResponseEntity.ok(updatedPedido);
   }

   // Nuevo endpoint para agregar un producto al detalle de un pedido
   @PostMapping("/{id}/detalle")
   public ResponseEntity<Pedido> addProductoToDetalle(@PathVariable String id, @RequestBody DetallePedido detalle) {
      Pedido updatedPedido = pedidoService.addProductoToDetalle(id, detalle);
      return ResponseEntity.ok(updatedPedido);
   }

   @GetMapping("/cliente/{id}")
   public ResponseEntity<Cliente> getCliente(@PathVariable("id") String id) {
      Cliente cliente = pedidoService.obtenerClientePorPedidoId(id);
      if (cliente == null) {
         return ResponseEntity.notFound().build();
      }
      return ResponseEntity.ok(cliente);
   }

   @GetMapping("/producto/{id}")
   public ResponseEntity<List<Producto>> getProductos(@PathVariable("id") String id) {
      List<Producto> productos = pedidoService.obtenerProductoPorPedidoId(id);

      if (productos.isEmpty()) {
         return ResponseEntity.noContent().build();
      }
      return ResponseEntity.ok(productos);
   }

}
