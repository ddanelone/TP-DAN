package isi.dan.ms_productos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import isi.dan.ms_productos.modelo.Producto;
import isi.dan.ms_productos.servicio.ProductoService;

import java.util.List;
import java.util.Map;

import io.micrometer.core.annotation.Counted;
import io.micrometer.core.annotation.Timed;
import io.micrometer.core.instrument.Counter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/productos")
@Timed(value = "productos.controller", description = "Time taken for operations in ProductoController")
public class ProductoController {

   @Autowired
   private ProductoService productoService;

   private static final Logger log = LoggerFactory.getLogger(ProductoController.class);

   private Counter createProductoCounter;
   private Counter deleteProductoCounter;

   @Counted(value = "productos.controller.create", description = "Number of times createProducto endpoint is called")
   @PostMapping
   public ResponseEntity<Producto> createProducto(@RequestBody Producto producto) {
      log.info("Creating new producto: {}", producto);
      Producto savedProducto = productoService.saveProducto(producto);
      createProductoCounter.increment();
      return ResponseEntity.ok(savedProducto);
   }

   @Timed(value = "productos.controller.getAll.timer", description = "Time taken to get all products")
   @GetMapping
   public List<Producto> getAllProductos() {
      log.info("Fetching all productos");
      return productoService.getAllProductos();
   }

   @Timed(value = "productos.controller.getById.timer", description = "Time taken to get a product by ID")
   @GetMapping("/{id}")
   public ResponseEntity<Producto> getProductoById(@PathVariable Long id) {
      log.info("Fetching producto with id: {}", id);
      Producto producto = productoService.getProductoById(id);
      return producto != null ? ResponseEntity.ok(producto) : ResponseEntity.notFound().build();
   }

   @Timed(value = "productos.controller.getByIds.timer", description = "Time taken to get products by IDs")
   @GetMapping("/ids")
   public ResponseEntity<List<Producto>> getProductosByIds(@RequestParam List<Long> ids) {
      log.info("Fetching productos with ids: {}", ids);
      List<Producto> productos = productoService.getProductosByIds(ids);
      return ResponseEntity.ok(productos);
   }

   @Counted(value = "productos.controller.delete", description = "Number of times deleteProducto endpoint is called")
   @Timed(value = "productos.controller.delete.timer", description = "Time taken to delete a product")
   @DeleteMapping("/{id}")
   public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
      log.info("Deleting producto with id: {}", id);
      productoService.deleteProducto(id);
      deleteProductoCounter.increment();
      return ResponseEntity.noContent().build();
   }

   // Verificar si hay stock suficiente de un producto dado
   @Timed(value = "productos.controller.verificarStock.timer", description = "Time taken to verify stock")
   @PostMapping("/{id}/verificar-stock")
   public ResponseEntity<?> verificarStock(@PathVariable Long id, @RequestBody Map<String, Integer> requestBody) {
      log.info("Verifying stock for producto with id: {}", id);
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