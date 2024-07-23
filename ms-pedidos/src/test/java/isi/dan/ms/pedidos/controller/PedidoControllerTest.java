package isi.dan.ms.pedidos.controller;

import isi.dan.ms.pedidos.MessageSenderService;
import isi.dan.ms.pedidos.aspect.JwtUtil;
import isi.dan.ms.pedidos.conf.EmbeddedMongoConfig;
import isi.dan.ms.pedidos.modelo.Estado;
import isi.dan.ms.pedidos.modelo.EstadoCambioRequest;
import isi.dan.ms.pedidos.modelo.Pedido;
import isi.dan.ms.pedidos.servicio.PedidoService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.micrometer.core.instrument.MeterRegistry;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@AutoConfigureMockMvc
@WebMvcTest(controllers = PedidoController.class)
@Import(EmbeddedMongoConfig.class)
@ActiveProfiles("test")
public class PedidoControllerTest {

   @Autowired
   private MockMvc mockMvc;

   @MockBean
   private PedidoService pedidoService;

   @MockBean
   private MessageSenderService messageSenderService;

   @MockBean
   private MeterRegistry meterRegistry;

   @MockBean
   private JwtUtil jwtUtil;

   String validJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJpYXQiOjE3MjE2NzgzOTAsImV4cCI6MTcyMjI4MzE5MH0.4GsTGu0Yc9-irygXLqg6cCh05IES4VVHzgsxCp-y4cE";

   @BeforeEach
   public void setUp() {
      mockMvc = MockMvcBuilders
            .standaloneSetup(new PedidoController(meterRegistry, pedidoService, messageSenderService)).build();

      when(jwtUtil.validateToken(anyString())).thenReturn(true);

   }

   @Test
   public void testCreatePedido() throws Exception {
      Pedido pedido = new Pedido();
      pedido.setId("123");
      Pedido savedPedido = new Pedido();
      savedPedido.setId("123");
      when(pedidoService.savePedido(any(Pedido.class))).thenReturn(savedPedido);

      mockMvc.perform(post("/api/pedidos")
            .header("Authorization", "Bearer "
                  + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(pedido)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").exists());
   }

   @Test
   public void testGetAllPedidos() throws Exception {
      Pedido pedido = new Pedido();
      pedido.setId("123");
      List<Pedido> pedidos = Collections.singletonList(pedido);
      when(pedidoService.getAllPedidos()).thenReturn(pedidos);

      mockMvc.perform(get("/api/pedidos")
            .header("Authorization", "Bearer "
                  + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$[0].id").exists());
   }

   @Test
   public void testGetPedidoById() throws Exception {
      Pedido pedido = new Pedido();
      pedido.setId("123");
      when(pedidoService.getPedidoById("123")).thenReturn(pedido);

      mockMvc.perform(get("/api/pedidos/123")
            .header("Authorization", "Bearer "
                  + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value("123"));
   }

   @Test
   public void testDeletePedido() throws Exception {
      doNothing().when(pedidoService).deletePedido("123");

      mockMvc.perform(delete("/api/pedidos/123")
            .header("Authorization", "Bearer "
                  + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());
   }

   @Test
   public void testUpdatePedidoEstado() throws Exception {
      Pedido pedido = new Pedido();
      pedido.setId("123");
      pedido.setEstado(Estado.EN_PREPARACION);
      pedido.setDetalle(new ArrayList<>());

      EstadoCambioRequest request = new EstadoCambioRequest();
      request.setNuevoEstado(Estado.CANCELADO);
      request.setUsuarioCambio("user1");

      Pedido updatedPedido = new Pedido();
      updatedPedido.setId("123");
      updatedPedido.setEstado(Estado.CANCELADO);

      when(pedidoService.getPedidoById("123")).thenReturn(pedido);
      when(pedidoService.updatePedido(any(Pedido.class))).thenReturn(updatedPedido);

      mockMvc.perform(put("/api/pedidos/123/estado")
            .header("Authorization", "Bearer "
                  + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(request)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value("123"))
            .andExpect(jsonPath("$.estado").value("CANCELADO"));
   }

   private static String asJsonString(final Object obj) {
      try {
         return new ObjectMapper().writeValueAsString(obj);
      } catch (Exception e) {
         throw new RuntimeException(e);
      }
   }
}