package isi.dan.ms_productos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import isi.dan.ms_productos.modelo.Producto;
import isi.dan.ms_productos.servicio.ProductoService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

   @Autowired
   private ProductoService productoService;

   @PostMapping
   public ResponseEntity<Producto> createProducto(@RequestBody Producto producto) {
      Producto savedProducto = productoService.saveProducto(producto);
      return ResponseEntity.ok(savedProducto);
   }

   @GetMapping
   public List<Producto> getAllProductos() {
      return productoService.getAllProductos();
   }

   @GetMapping("/{id}")
   public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
      Producto producto = productoService.getProductoById(id);
      return producto != null ? ResponseEntity.ok(producto) : ResponseEntity.notFound().build();
   }

   @GetMapping("/ids")
   public ResponseEntity<List<Producto>> getProductosByIds(@RequestParam List<Long> ids) {
      List<Producto> productos = productoService.getProductosByIds(ids);
      return ResponseEntity.ok(productos);
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
      productoService.deleteProducto(id);
      return ResponseEntity.noContent().build();
   }

   // Verificar si hay stock suficiente de un producto dado
   @PostMapping("/{id}/verificar-stock")
   public ResponseEntity<?> verificarStock(@PathVariable Long id, @RequestBody Map<String, Integer> requestBody) {
      int cantidadDeseada = requestBody.get("cantidadDeseada");
      Producto producto = productoService.getProductoById(id);

      if (producto == null) {
         return ResponseEntity.notFound().build();
      }

      if (producto.getStockActual() >= cantidadDeseada) {
         return ResponseEntity.ok().build();
      } else {
         String mensaje = "No hay suficiente stock del producto " + id + ", nombre " + producto.getNombre();
         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(mensaje);
      }
   }

}
