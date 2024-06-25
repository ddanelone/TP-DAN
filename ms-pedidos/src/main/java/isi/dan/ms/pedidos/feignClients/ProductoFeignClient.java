package isi.dan.ms.pedidos.feignClients;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import isi.dan.ms.pedidos.modelo.Producto;

@FeignClient(name = "ms-productos")
public interface ProductoFeignClient {

   @PostMapping("/api/productos")
   Producto agregarProducto(@RequestBody Producto producto);

   @GetMapping("/producto/pedido/{id}")
   List<Producto> getProductos(@PathVariable("id") String id);
}
