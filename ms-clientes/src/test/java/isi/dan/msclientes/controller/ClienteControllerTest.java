package isi.dan.msclientes.controller;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.impl.DefaultClaims;
import isi.dan.msclientes.aspect.JwtUtility;
import isi.dan.msclientes.conf.MessageSenderService;
import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.servicios.ClienteService;
import isi.dan.msclientes.servicios.UsuarioHabilitadoService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class ClienteControllerTest {

   @Autowired
   private MockMvc mockMvc;

   @MockBean
   private ClienteService clienteService;

   @MockBean
   private UsuarioHabilitadoService usuarioHabilitadoService;

   @MockBean
   private MessageSenderService messageSenderService;

   private Cliente cliente;

   @MockBean
   private JwtUtility jwtUtil;

   String validJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJpYXQiOjE3MjE2NzgzOTAsImV4cCI6MTcyMjI4MzE5MH0.4GsTGu0Yc9-irygXLqg6cCh05IES4VVHzgsxCp-y4cE";

   @BeforeEach
   void setUp() {
      cliente = new Cliente();
      cliente.setId(1);
      cliente.setNombre("Test Cliente");
      cliente.setCorreoElectronico("test@cliente.com");
      cliente.setCuit("12998887776");
      cliente.setMaximoDescubierto(new BigDecimal("110000"));

      Claims claims = new DefaultClaims();
      claims.setSubject("user");

      when(jwtUtil.validateToken(anyString())).thenReturn(claims);
   }

   @Test
   void testGetAll() throws Exception {
      Mockito.when(clienteService.findAll()).thenReturn(Collections.singletonList(cliente));

      mockMvc.perform(get("/api/clientes").header("Authorization", "Bearer "
            + validJwtToken))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$[0].nombre").value("Test Cliente"));
   }

   @Test
   void testGetById() throws Exception {
      Mockito.when(clienteService.findById(1)).thenReturn(Optional.of(cliente));

      mockMvc.perform(get("/api/clientes/1").header("Authorization", "Bearer "
            + validJwtToken))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.nombre").value("Test Cliente"))
            .andExpect(jsonPath("$.cuit").value("12998887776"));
   }

   @Test
   void testGetById_NotFound() throws Exception {
      Mockito.when(clienteService.findById(2)).thenReturn(Optional.empty());

      mockMvc.perform(get("/api/clientes/2").header("Authorization", "Bearer "
            + validJwtToken))
            .andExpect(status().isNotFound());
   }

   @Test
   void testCreate() throws Exception {
      Mockito.when(clienteService.save(Mockito.any(Cliente.class))).thenReturn(cliente);

      mockMvc.perform(post("/api/clientes").header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(cliente)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nombre").value("Test Cliente"));
   }

   @Test
   void testUpdate() throws Exception {
      Mockito.when(clienteService.findById(1)).thenReturn(Optional.of(cliente));
      Mockito.when(clienteService.update(Mockito.any(Cliente.class))).thenReturn(cliente);

      mockMvc.perform(put("/api/clientes/1").header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(cliente)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nombre").value("Test Cliente"));
   }

   @Test
   void testDelete() throws Exception {
      Mockito.when(clienteService.findById(1)).thenReturn(Optional.of(cliente));
      Mockito.doNothing().when(clienteService).deleteById(1);

      mockMvc.perform(delete("/api/clientes/1").header("Authorization", "Bearer "
            + validJwtToken))
            .andExpect(status().isNoContent());
   }

   @Test
   void testVerificarSaldo_SaldoSuficiente() throws Exception {
      Mockito.when(clienteService.findById(1)).thenReturn(Optional.of(cliente));

      mockMvc.perform(get("/api/clientes/1/verificar-saldo").header("Authorization", "Bearer " + validJwtToken)
            .param("montoTotal", "500.00"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(content().string("true"));
   }

   @Test
   void testVerificarSaldo_SaldoInsuficiente() throws Exception {
      Mockito.when(clienteService.findById(1)).thenReturn(Optional.of(cliente));

      mockMvc.perform(get("/api/clientes/1/verificar-saldo").header("Authorization", "Bearer " + validJwtToken)
            .param("montoTotal", "150000.00"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(content().string("false"));
   }

   @Test
   void testVerificarSaldo_ClienteNoEncontrado() throws Exception {
      Mockito.when(clienteService.findById(1)).thenReturn(Optional.empty());

      mockMvc.perform(get("/api/clientes/1/verificar-saldo").header("Authorization", "Bearer " + validJwtToken)
            .param("montoTotal", "500.00"))
            .andExpect(status().isNotFound());
   }

   @Test
   void testValidarCorreo_CorreoValido() throws Exception {
      String correoValido = "test@example.com";
      Mockito.when(clienteService.validarCorreo(correoValido)).thenReturn(true);

      mockMvc.perform(get("/api/clientes/validar-correo")
            .param("correo", correoValido))
            .andExpect(status().isOk())
            .andExpect(content().string("true"));
   }

   @Test
   void testValidarCorreo_CorreoInvalido() throws Exception {
      String correoInvalido = "test@invalid";
      Mockito.when(clienteService.validarCorreo(correoInvalido)).thenReturn(false);

      mockMvc.perform(get("/api/clientes/validar-correo")
            .param("correo", correoInvalido))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("false"));
   }

   private static String asJsonString(final Object obj) {
      try {
         ObjectMapper mapper = new ObjectMapper();
         mapper.findAndRegisterModules();
         return mapper.writeValueAsString(obj);
      } catch (Exception e) {
         throw new RuntimeException(e);
      }
   }
}
