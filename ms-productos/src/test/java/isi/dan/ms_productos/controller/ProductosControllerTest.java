package isi.dan.ms_productos.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import isi.dan.ms_productos.modelo.Categoria;
import isi.dan.ms_productos.modelo.Producto;
import isi.dan.ms_productos.servicio.ProductoService;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductosControllerTest {

   @Autowired
   private MockMvc mockMvc;

   @MockBean
   private ProductoService productoService;

   @Test
   void testCreateProducto() throws Exception {
      Producto producto = new Producto();
      producto.setId(1L);
      producto.setNombre("Cemento");
      producto.setDescripcion("Cemento de alta calidad");
      producto.setStockActual(100);
      producto.setStockMinimo(10);
      producto.setPrecio(new BigDecimal("50.00"));
      producto.setDescuento(new BigDecimal("0.00"));
      producto.setCategoria(Categoria.CEMENTOS);

      when(productoService.saveProducto(any(Producto.class))).thenReturn(producto);

      mockMvc.perform(post("/api/productos")
            .contentType(MediaType.APPLICATION_JSON)
            .content(
                  "{ \"nombre\": \"Cemento\", \"descripcion\": \"Cemento de alta calidad\", \"stockActual\": 100, \"stockMinimo\": 10, \"precio\": 50.00, \"descuento\": 0.00, \"categoria\": \"CEMENTOS\" }"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1L))
            .andExpect(jsonPath("$.nombre").value("Cemento"))
            .andExpect(jsonPath("$.descripcion").value("Cemento de alta calidad"))
            .andExpect(jsonPath("$.stockActual").value(100))
            .andExpect(jsonPath("$.stockMinimo").value(10))
            .andExpect(jsonPath("$.precio").value(50.00))
            .andExpect(jsonPath("$.descuento").value(0.00))
            .andExpect(jsonPath("$.categoria").value("CEMENTOS"));
   }

   @Test
   void testGetAllProductos() throws Exception {
      Producto producto = new Producto();
      producto.setId(1L);
      producto.setNombre("Cemento");

      List<Producto> productos = Arrays.asList(producto);

      when(productoService.getAllProductos()).thenReturn(productos);

      mockMvc.perform(get("/api/productos")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id").value(1L))
            .andExpect(jsonPath("$[0].nombre").value("Cemento"));
   }

   @Test
   void testGetProductoById() throws Exception {
      Producto producto = new Producto();
      producto.setId(1L);
      producto.setNombre("Cemento");

      when(productoService.getProductoById(1L)).thenReturn(producto);

      mockMvc.perform(get("/api/productos/1")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1L))
            .andExpect(jsonPath("$.nombre").value("Cemento"));
   }

   @Test
   void testGetProductosByIds() throws Exception {
      Producto producto1 = new Producto();
      producto1.setId(1L);
      producto1.setNombre("Cemento");

      Producto producto2 = new Producto();
      producto2.setId(2L);
      producto2.setNombre("Placa");

      List<Producto> productos = Arrays.asList(producto1, producto2);

      when(productoService.getProductosByIds(Arrays.asList(1L, 2L))).thenReturn(productos);

      mockMvc.perform(get("/api/productos/ids?ids=1,2")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].id").value(1L))
            .andExpect(jsonPath("$[0].nombre").value("Cemento"))
            .andExpect(jsonPath("$[1].id").value(2L))
            .andExpect(jsonPath("$[1].nombre").value("Placa"));
   }

   @Test
   void testDeleteProducto() throws Exception {
      mockMvc.perform(delete("/api/productos/1")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());
   }

   @Test
   void testVerificarStock() throws Exception {
      Producto producto = new Producto();
      producto.setId(1L);
      producto.setStockActual(100);
      producto.setNombre("Cemento");

      when(productoService.getProductoById(1L)).thenReturn(producto);
      when(productoService.verificarStock(1L, 50)).thenReturn(true);
      when(productoService.verificarStock(1L, 150)).thenReturn(false);

      mockMvc.perform(post("/api/productos/1/verificar-stock")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{ \"cantidad\": 50 }"))
            .andExpect(status().isOk());

      mockMvc.perform(post("/api/productos/1/verificar-stock")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{ \"cantidad\": 150 }"))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("No hay suficiente stock del producto 1"));
   }

   @Test
   void testUpdateStockAndPrice() throws Exception {
      Producto producto = new Producto();
      producto.setId(1L);
      producto.setStockActual(100);
      producto.setPrecio(new BigDecimal("50.00"));

      when(productoService.updateStockAndPrice(eq(1L), anyInt(), any(BigDecimal.class)))
            .thenReturn(producto);

      mockMvc.perform(put("/api/productos/1/update-stock-and-price")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{ \"cantidad\": 200, \"precio\": 75.00 }"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.stockActual").value(100))
            .andExpect(jsonPath("$.precio").value(50.00));
   }

   @Test
   void testUpdateDescuento() throws Exception {
      Producto producto = new Producto();
      producto.setId(1L);
      producto.setDescuento(new BigDecimal("10.00"));

      when(productoService.updateDescuento(eq(1L), any(BigDecimal.class))).thenReturn(producto);

      mockMvc.perform(put("/api/productos/1/update-descuento")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{ \"descuento\": 15.00 }"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.descuento").value(10.00));
   }

   @Test
   void testUpdateStock() throws Exception {
      Producto producto = new Producto();
      producto.setId(1L);
      producto.setStockActual(100);

      when(productoService.updateStock(eq(1L), anyInt())).thenAnswer(invocation -> {
         int cantidad = invocation.getArgument(1);
         producto.setStockActual(producto.getStockActual() - cantidad);
         return producto;
      });

      mockMvc.perform(post("/api/productos/1/update-stock")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{ \"cantidad\": 20 }"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.stockActual").value(80));
   }

}
