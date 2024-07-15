package isi.dan.ms_productos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import isi.dan.ms_productos.modelo.Producto;
import isi.dan.ms_productos.servicio.ProductoService;
import jakarta.annotation.PostConstruct;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import io.micrometer.core.annotation.Counted;
import io.micrometer.core.annotation.Timed;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/productos")
@Timed(value = "productos.controller", description = "Time taken for operations in ProductoController")
public class ProductoController {

   @Autowired
   private ProductoService productoService;

   @Autowired
   private MeterRegistry meterRegistry;

   private static final Logger log = LoggerFactory.getLogger(ProductoController.class);

   private Counter createProductoCounter;
   private Counter deleteProductoCounter;

   @PostConstruct
   public void init() {
      createProductoCounter = meterRegistry.counter("productos.controller.create");
      deleteProductoCounter = meterRegistry.counter("productos.controller.delete");
   }

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

   @Timed(value = "productos.controller.verificarStock.timer", description = "Time taken to verify stock")
   @PostMapping("/{id}/verificar-stock")
   public ResponseEntity<?> verificarStock(@PathVariable Long id, @RequestBody Map<String, Integer> requestBody) {
      log.info("Verifying stock for producto with id: {}", id);

      Integer cantidad = requestBody.get("cantidad");

      if (cantidad == null) {
         return ResponseEntity.status(HttpStatus.BAD_REQUEST)
               .body("La clave 'cantidad' no está presente en el cuerpo de la solicitud.");
      }

      boolean stockDisponible = productoService.verificarStock(id, cantidad);

      Map<String, Boolean> response = new HashMap<>();
      response.put("stockDisponible", stockDisponible);

      return ResponseEntity.ok(response);
   }

   @PostMapping("/{id}/update-stock")
   public ResponseEntity<Producto> updateStock(@PathVariable Long id, @RequestBody Map<String, Integer> requestBody) {
      log.info("Updating stock for producto with id: {}", id);
      int cantidad = requestBody.get("cantidad");
      Producto updatedProducto = productoService.updateStock(id, cantidad);

      if (updatedProducto != null) {
         return ResponseEntity.ok(updatedProducto);
      } else {
         return ResponseEntity.notFound().build();
      }
   }

   @Timed(value = "productos.controller.updateStockAndPrice.timer", description = "Time taken to update stock and price")
   @PutMapping("/{id}/update-stock-and-price")
   public ResponseEntity<Producto> updateStockAndPrice(@PathVariable Long id,
         @RequestBody Map<String, Object> requestBody) {
      log.info("Updating stock and price for producto with id: {}", id);
      Producto updatedProducto = productoService.updateStockAndPrice(id, (Integer) requestBody.get("cantidad"),
            new BigDecimal(requestBody.get("precio").toString()));
      return ResponseEntity.ok(updatedProducto);
   }

   @Timed(value = "productos.controller.updateDescuento.timer", description = "Time taken to update discount")
   @PutMapping("/{id}/update-descuento")
   public ResponseEntity<Producto> updateDescuento(@PathVariable Long id,
         @RequestBody Map<String, BigDecimal> requestBody) {
      log.info("Updating discount for producto with id: {}", id);
      BigDecimal descuento = requestBody.get("descuento");
      Producto updatedProducto = productoService.updateDescuento(id, descuento);
      return ResponseEntity.ok(updatedProducto);
   }
}