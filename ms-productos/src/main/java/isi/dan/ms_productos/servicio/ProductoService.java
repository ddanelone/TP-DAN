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

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

   public Page<Producto> getAllProductos(Pageable pageable) {
      return Observation.createNotStarted("producto.getAll", observationRegistry)
            .observe(() -> {
               Timer.Sample sample = Timer.start(meterRegistry);
               try {
                  return productoRepository.findAll(pageable);
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

   public Page<Producto> searchProductos(Long id, String nombre, BigDecimal precioMin, BigDecimal precioMax,
         Pageable pageable) {
      Timer.Sample sample = Timer.start(meterRegistry);
      try {
         List<Producto> productos = productoRepository.findAll();

         Stream<Producto> stream = productos.stream();

         if (id != null) {
            stream = stream.filter(producto -> producto.getId().equals(id));
         }
         if (nombre != null && !nombre.isEmpty()) {
            stream = stream.filter(producto -> producto.getNombre().toLowerCase().contains(nombre.toLowerCase()));
         }
         if (precioMin != null) {
            stream = stream.filter(producto -> producto.getPrecio().compareTo(precioMin) >= 0);
         }
         if (precioMax != null) {
            stream = stream.filter(producto -> producto.getPrecio().compareTo(precioMax) <= 0);
         }

         List<Producto> filteredProducts = stream.collect(Collectors.toList());

         // Paginar los resultados filtrados
         int start = (int) pageable.getOffset();
         int end = Math.min((start + pageable.getPageSize()), filteredProducts.size());
         List<Producto> pagedProducts = filteredProducts.subList(start, end);

         return new PageImpl<>(pagedProducts, pageable, filteredProducts.size());
      } finally {
         sample.stop(meterRegistry.timer("producto.search"));
      }
   }

}
