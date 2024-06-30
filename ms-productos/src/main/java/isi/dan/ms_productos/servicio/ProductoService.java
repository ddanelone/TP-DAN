package isi.dan.ms_productos.servicio;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import isi.dan.ms_productos.dao.ProductoRepository;
import isi.dan.ms_productos.modelo.Producto;

import java.util.List;

@Service
public class ProductoService {
   @Autowired
   private ProductoRepository productoRepository;
   Logger log = LoggerFactory.getLogger(ProductoService.class);

   public Producto saveProducto(Producto producto) {
      return productoRepository.save(producto);
   }

   public List<Producto> getAllProductos() {
      return productoRepository.findAll();
   }

   public Producto getProductoById(Long id) {
      return productoRepository.findById(id).orElse(null);
   }

   public void deleteProducto(Long id) {
      productoRepository.deleteById(id);
   }

   public List<Producto> getProductosByIds(List<Long> ids) {
      return productoRepository.findAllById(ids);
   }
}