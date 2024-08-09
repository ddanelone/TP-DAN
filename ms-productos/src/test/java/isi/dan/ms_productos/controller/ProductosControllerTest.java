package isi.dan.ms_productos.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.impl.DefaultClaims;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import isi.dan.ms_productos.aspect.JwtUtility;
import isi.dan.ms_productos.modelo.Categoria;
import isi.dan.ms_productos.modelo.Producto;
import isi.dan.ms_productos.servicio.ProductoService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@SpringBootTest
@AutoConfigureMockMvc
public class ProductosControllerTest {

   @Autowired
   private MockMvc mockMvc;

   @MockBean
   private ProductoService productoService;

   @MockBean
   private JwtUtility jwtUtil;

   String validJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJpYXQiOjE3MjE2NzgzOTAsImV4cCI6MTcyMjI4MzE5MH0.4GsTGu0Yc9-irygXLqg6cCh05IES4VVHzgsxCp-y4cE";

   @BeforeEach
   void setUp() {
      Claims claims = new DefaultClaims();
      claims.setSubject("user");

      when(jwtUtil.validateToken(anyString())).thenReturn(claims);
   }

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
            .header("Authorization", "Bearer "
                  + validJwtToken)
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
      Pageable pageable = PageRequest.of(0, 10);
      Page<Producto> productosPage = new PageImpl<>(productos, pageable, productos.size());

      when(productoService.getAllProductos(pageable)).thenReturn(productosPage);

      mockMvc.perform(get("/api/productos")
            .param("page", "0")
            .param("size", "10")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.content[0].id").value(1L))
            .andExpect(jsonPath("$.content[0].nombre").value("Cemento"))
            .andExpect(jsonPath("$.numberOfElements").value(1))
            .andExpect(jsonPath("$.totalElements").value(1))
            .andExpect(jsonPath("$.totalPages").value(1));
   }

   @Test
   void testGetProductoById() throws Exception {
      Producto producto = new Producto();
      producto.setId(1L);
      producto.setNombre("Cemento");

      when(productoService.getProductoById(1L)).thenReturn(producto);

      mockMvc.perform(get("/api/productos/1")
            .header("Authorization", "Bearer "
                  + validJwtToken)
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
            .header("Authorization", "Bearer "
                  + validJwtToken)
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
            .header("Authorization", "Bearer "
                  + validJwtToken)
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
            .header("Authorization", "Bearer "
                  + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{ \"cantidad\": 50 }"))
            .andExpect(status().isOk());

      mockMvc.perform(post("/api/productos/1/verificar-stock")
            .header("Authorization", "Bearer "
                  + validJwtToken)
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
            .header("Authorization", "Bearer "
                  + validJwtToken)
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
            .header("Authorization", "Bearer "
                  + validJwtToken)
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
            .header("Authorization", "Bearer "
                  + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{ \"cantidad\": 20 }"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.stockActual").value(80));
   }

   @Test
   void testSearchProductos() throws Exception {
      Producto producto1 = new Producto();
      producto1.setId(1L);
      producto1.setNombre("Producto 1");

      Producto producto2 = new Producto();
      producto2.setId(2L);
      producto2.setNombre("Producto 2");

      List<Producto> productos = Arrays.asList(producto1, producto2);
      Page<Producto> productosPage = new PageImpl<>(productos);

      when(productoService.searchProductos(
            anyLong(), anyString(), any(BigDecimal.class), any(BigDecimal.class), any(Pageable.class)))
            .thenReturn(productosPage);

      mockMvc.perform(get("/api/productos/search")
            .param("id", "1")
            .param("nombre", "Producto")
            .param("precioMin", "10.00")
            .param("precioMax", "100.00")
            .param("page", "0")
            .param("size", "10")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.content[0].id").value(1L))
            .andExpect(jsonPath("$.content[0].nombre").value("Producto 1"))
            .andExpect(jsonPath("$.content[1].id").value(2L))
            .andExpect(jsonPath("$.content[1].nombre").value("Producto 2"));
   }

}
