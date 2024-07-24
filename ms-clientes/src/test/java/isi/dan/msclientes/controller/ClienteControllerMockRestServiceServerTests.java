package isi.dan.msclientes.controller;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.web.client.MockRestServiceServer;

import com.fasterxml.jackson.databind.ObjectMapper;

import isi.dan.msclientes.aspect.JwtUtil;
import isi.dan.msclientes.conf.MessageSenderService;
import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.model.UsuarioHabilitado;
import isi.dan.msclientes.servicios.ClienteService;
import isi.dan.msclientes.servicios.UsuarioHabilitadoService;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ClienteControllerMockRestServiceServerTests {

   @Autowired
   private MockMvc mockMvc;

   @MockBean
   private ClienteService clienteService;

   @MockBean
   private UsuarioHabilitadoService usuarioHabilitadoService;

   @MockBean
   private MessageSenderService messageSenderService;

   @Autowired
   private TestRestTemplate restTemplate;

   @Autowired
   private ObjectMapper objectMapper;

   private MockRestServiceServer mockRestServiceServer;

   @MockBean
   private JwtUtil jwtUtil;

   String validJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJpYXQiOjE3MjE2NzgzOTAsImV4cCI6MTcyMjI4MzE5MH0.4GsTGu0Yc9-irygXLqg6cCh05IES4VVHzgsxCp-y4cE";

   @BeforeEach
   public void setUp() {
      mockRestServiceServer = MockRestServiceServer.createServer(restTemplate.getRestTemplate());
      when(jwtUtil.validateToken(anyString())).thenReturn(true);
   }

   @Test
   @Order(1)
   public void testGetAllClientes() throws Exception {
      Cliente cliente1 = new Cliente(1, "Cliente1", "cliente1@domain.com", "12345678901", new BigDecimal("100000"));
      Cliente cliente2 = new Cliente(2, "Cliente2", "cliente2@domain.com", "12345678902", new BigDecimal("200000"));
      List<Cliente> clientes = Arrays.asList(cliente1, cliente2);

      when(clienteService.findAll()).thenReturn(clientes);

      mockMvc.perform(get("/api/clientes")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].nombre").value("Cliente1"))
            .andExpect(jsonPath("$[1].nombre").value("Cliente2"));
   }

   @Test
   @Order(2)
   public void testGetClienteById() throws Exception {
      Cliente cliente = new Cliente(1, "Cliente", "cliente@domain.com", "12345678901", new BigDecimal("100000"));

      when(clienteService.findById(1)).thenReturn(Optional.of(cliente));

      mockMvc.perform(get("/api/clientes/1")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nombre").value("Cliente"));
   }

   @Test
   @Order(3)
   public void testCreateCliente() throws Exception {
      Cliente cliente = new Cliente(null, "Nuevo Cliente", "nuevo@domain.com", "12345678903", new BigDecimal("300000"));
      Cliente createdCliente = new Cliente(1, "Nuevo Cliente", "nuevo@domain.com", "12345678903",
            new BigDecimal("300000"));

      when(clienteService.save(cliente)).thenReturn(createdCliente);

      mockMvc.perform(post("/api/clientes")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(cliente)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nombre").value("Nuevo Cliente"));
   }

   @Test
   @Order(4)
   public void testUpdateCliente() throws Exception {
      Cliente cliente = new Cliente(1, "Cliente Actualizado", "actualizado@domain.com", "12345678904",
            new BigDecimal("400000"));

      when(clienteService.findById(1)).thenReturn(Optional.of(cliente));
      when(clienteService.update(cliente)).thenReturn(cliente);

      mockMvc.perform(put("/api/clientes/1")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(cliente)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nombre").value("Cliente Actualizado"));
   }

   @Test
   @Order(5)
   public void testDeleteCliente() throws Exception {
      when(clienteService.findById(1)).thenReturn(
            Optional.of(new Cliente(1, "Cliente", "cliente@domain.com", "12345678901", new BigDecimal("100000"))));

      mockMvc.perform(delete("/api/clientes/1")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());
   }

   @Test
   @Order(6)
   public void testGetClienteByEmail() throws Exception {
      Cliente cliente = new Cliente(1, "Cliente", "cliente@domain.com", "12345678901", new BigDecimal("100000"));

      when(clienteService.findByCorreoElectronico("cliente@domain.com")).thenReturn(Optional.of(cliente));

      mockMvc.perform(get("/api/clientes/email/{email}", "cliente@domain.com")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nombre").value("Cliente"));
   }

   @Test
   @Order(7)
   public void testAgregarUsuarioHabilitado() throws Exception {
      Cliente cliente = new Cliente(1, "Cliente", "cliente@domain.com", "12345678901", new BigDecimal("100000"));
      UsuarioHabilitado usuarioHabilitado = new UsuarioHabilitado(1, "UsuarioNombre1", "UsuarioApellido1", "12345678",
            "un@correo.com", cliente);
      UsuarioHabilitado savedUser = new UsuarioHabilitado(2, "UsuarioNombre2", "UsuarioApellido2", "23456789",
            "otro@correo.com", cliente);

      when(clienteService.findById(1)).thenReturn(Optional.of(cliente));
      when(usuarioHabilitadoService.save(usuarioHabilitado)).thenReturn(savedUser);

      mockMvc.perform(post("/api/clientes/1/usuarios-habilitados")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(usuarioHabilitado)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(2));
   }

   @Test
   @Order(8)
   public void testEliminarUsuarioHabilitado() throws Exception {
      Cliente cliente = new Cliente(1, "Cliente", "cliente@domain.com", "12345678901", new BigDecimal("100000"));
      Set<UsuarioHabilitado> usuariosHabilitados = new HashSet<>();
      UsuarioHabilitado usuarioHabilitado = new UsuarioHabilitado(1, "UsuarioNombre1", "UsuarioApellido1", "12345678",
            "un@correo.com", cliente);
      usuariosHabilitados.add(usuarioHabilitado);
      cliente.setUsuariosHabilitados(usuariosHabilitados);

      when(clienteService.findById(1)).thenReturn(Optional.of(cliente));
      doNothing().when(usuarioHabilitadoService).deleteById(1);

      mockMvc.perform(delete("/api/clientes/1/usuarios-habilitados/1")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());
   }

   @Test
   @Order(9)
   public void testVerificarSaldo() throws Exception {
      Cliente cliente = new Cliente(1, "Cliente", "cliente@domain.com", "12345678901", new BigDecimal("500000"));

      when(clienteService.findById(1)).thenReturn(Optional.of(cliente));

      mockMvc.perform(get("/api/clientes/1/verificar-saldo")
            .param("montoTotal", "400000")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().string("true"));
   }

   @Test
   @Order(10)
   public void testValidarCorreo_CorreoValido() throws Exception {
      String correoValido = "test@example.com";

      when(clienteService.validarCorreo(correoValido)).thenReturn(true);

      mockMvc.perform(get("/api/clientes/validar-correo")
            .param("correo", correoValido)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(content().string("true"));
   }

   @Test
   @Order(11)
   public void testValidarCorreo_CorreoInvalido() throws Exception {
      String correoInvalido = "test@invalid";

      when(clienteService.validarCorreo(correoInvalido)).thenReturn(false);

      mockMvc.perform(get("/api/clientes/validar-correo")
            .param("correo", correoInvalido)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isBadRequest())
            .andExpect(content().string("false"));
   }

}
