package isi.dan.ms_productos.servicio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import io.micrometer.observation.Observation;
import io.micrometer.observation.ObservationRegistry;
import isi.dan.ms_productos.dao.ProductoRepository;
import isi.dan.ms_productos.modelo.Producto;
import jakarta.annotation.PostConstruct;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductoService {

   @Autowired
   private ProductoRepository productoRepository;

   @Autowired
   private MeterRegistry meterRegistry;

   Logger log = LoggerFactory.getLogger(ProductoService.class);

   @Autowired
   private ObservationRegistry observationRegistry;

   @PostConstruct
   public void init() {
      log.info("Microservicio de Productos iniciado y enviando logs a Graylog");
   }

   public Producto saveProducto(Producto producto) {
      return Observation.createNotStarted("producto.save", observationRegistry)
            .observe(() -> {
               Timer.Sample sample = Timer.start(meterRegistry);
               try {
                  return productoRepository.save(producto);
               } finally {
                  sample.stop(meterRegistry.timer("producto.save"));
               }
            });
   }

   public List<Producto> getAllProductos() {
      return Observation.createNotStarted("producto.getAll", observationRegistry)
            .observe(() -> {
               Timer.Sample sample = Timer.start(meterRegistry);
               try {
                  return productoRepository.findAll();
               } finally {
                  sample.stop(meterRegistry.timer("producto.getAll"));
               }
            });
   }

   public Producto getProductoById(Long id) {
      return Observation.createNotStarted("producto.getById", observationRegistry)
            .observe(() -> {
               Timer.Sample sample = Timer.start(meterRegistry);
               try {
                  return productoRepository.findById(id).orElse(null);
               } finally {
                  sample.stop(meterRegistry.timer("producto.getById"));
               }
            });
   }

   public void deleteProducto(Long id) {
      Observation.createNotStarted("producto.delete", observationRegistry)
            .observe(() -> {
               Timer.Sample sample = Timer.start(meterRegistry);
               try {
                  productoRepository.deleteById(id);
               } finally {
                  sample.stop(meterRegistry.timer("producto.delete"));
               }
            });
   }

   public List<Producto> getProductosByIds(List<Long> ids) {
      return Observation.createNotStarted("producto.getByIds", observationRegistry)
            .observe(() -> {
               Timer.Sample sample = Timer.start(meterRegistry);
               try {
                  return productoRepository.findAllById(ids);
               } finally {
                  sample.stop(meterRegistry.timer("producto.getByIds"));
               }
            });
   }

   public Producto updateStockAndPrice(Long id, int cantidad, BigDecimal precio) {
      return Observation.createNotStarted("producto.updateStockAndPrice", observationRegistry)
            .observe(() -> {
               Timer.Sample sample = Timer.start(meterRegistry);
               try {
                  Producto producto = productoRepository.findById(id).orElse(null);
                  if (producto != null) {
                     producto.setStockActual(producto.getStockActual() + cantidad);
                     producto.setPrecio(precio);
                     return productoRepository.save(producto);
                  }
                  return null;
               } finally {
                  sample.stop(meterRegistry.timer("producto.updateStockAndPrice"));
               }
            });
   }

   public Producto updateDescuento(Long id, BigDecimal descuento) {
      return Observation.createNotStarted("producto.updateDescuento", observationRegistry)
            .observe(() -> {
               Timer.Sample sample = Timer.start(meterRegistry);
               try {
                  Producto producto = productoRepository.findById(id).orElse(null);
                  if (producto != null) {
                     producto.setDescuento(descuento);
                     return productoRepository.save(producto);
                  }
                  return null;
               } finally {
                  sample.stop(meterRegistry.timer("producto.updateDescuento"));
               }
            });
   }

   public boolean verificarStock(Long id, int cantidadDeseada) {
      Producto producto = productoRepository.findById(id).orElse(null);
      return producto != null && producto.getStockActual() >= cantidadDeseada;
   }

   public Producto updateStock(Long id, int cantidad) {
      return Observation.createNotStarted("producto.updateStock", observationRegistry)
            .observe(() -> {
               Timer.Sample sample = Timer.start(meterRegistry);
               try {
                  Producto producto = productoRepository.findById(id).orElse(null);
                  if (producto != null) {
                     producto.setStockActual(producto.getStockActual() - cantidad);
                     return productoRepository.save(producto);
                  }
                  return null;
               } finally {
                  sample.stop(meterRegistry.timer("producto.updateStock"));
               }
            });
   }
}
