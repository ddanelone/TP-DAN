package isi.dan.ms_productos.servicio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Timer;
import isi.dan.ms_productos.dao.ProductoRepository;
import isi.dan.ms_productos.modelo.Producto;

import java.util.List;

@Service
public class ProductoService {

   @Autowired
   private ProductoRepository productoRepository;

   @Autowired
   private MeterRegistry meterRegistry;

   Logger log = LoggerFactory.getLogger(ProductoService.class);

   public Producto saveProducto(Producto producto) {
      Timer.Sample sample = Timer.start(meterRegistry);
      try {
         return productoRepository.save(producto);
      } finally {
         sample.stop(meterRegistry.timer("producto.save"));
      }
   }

   public List<Producto> getAllProductos() {
      Timer.Sample sample = Timer.start(meterRegistry);
      try {
         return productoRepository.findAll();
      } finally {
         sample.stop(meterRegistry.timer("producto.getAll"));
      }
   }

   public Producto getProductoById(Long id) {
      Timer.Sample sample = Timer.start(meterRegistry);
      try {
         return productoRepository.findById(id).orElse(null);
      } finally {
         sample.stop(meterRegistry.timer("producto.getById"));
      }
   }

   public void deleteProducto(Long id) {
      Timer.Sample sample = Timer.start(meterRegistry);
      try {
         productoRepository.deleteById(id);
      } finally {
         sample.stop(meterRegistry.timer("producto.delete"));
      }
   }

   public List<Producto> getProductosByIds(List<Long> ids) {
      Timer.Sample sample = Timer.start(meterRegistry);
      try {
         return productoRepository.findAllById(ids);
      } finally {
         sample.stop(meterRegistry.timer("producto.getByIds"));
      }
   }
}
