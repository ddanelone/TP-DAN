package isi.dan.msclientes.controller;

import isi.dan.msclientes.aspect.JwtUtil;
import isi.dan.msclientes.conf.MessageSenderService;
import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.servicios.ClienteService;

import org.apache.http.auth.AUTH;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ActiveProfiles("test")
public class ClienteControllerTestRestTemplateTests {

   @LocalServerPort
   private int port;

   @Autowired
   private TestRestTemplate restTemplate;

   @Autowired
   private ClienteService clienteService;

   @MockBean
   private MessageSenderService messageSenderService;

   private Cliente cliente;

   @MockBean
   private JwtUtil jwtUtil;

   String validJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJpYXQiOjE3MjE2NzgzOTAsImV4cCI6MTcyMjI4MzE5MH0.4GsTGu0Yc9-irygXLqg6cCh05IES4VVHzgsxCp-y4cE";

   @BeforeEach
   void setUp() {
      // Crear un cliente nuevo para usar en cada prueba
      cliente = new Cliente();
      cliente.setNombre("Test Cliente");
      cliente.setCorreoElectronico("test@cliente.com");
      cliente.setCuit("12998887776");
      cliente.setMaximoDescubierto(new BigDecimal("110000"));

      // Guardar el cliente en la base de datos antes de cada prueba
      cliente = clienteService.save(cliente);

      when(jwtUtil.validateToken(anyString())).thenReturn(true);
   }

   @AfterEach
   void tearDown() {
      // Limpiar la base de datos después de cada prueba
      clienteService.deleteById(cliente.getId());
   }

   @Test
   @Order(1)
   void testCreate() {
      Cliente newCliente = new Cliente();
      newCliente.setNombre("Test Cliente");
      newCliente.setCorreoElectronico("nuevo@cliente.com");
      newCliente.setCuit("2998887777");
      HttpHeaders headers = new HttpHeaders();
      headers.setBearerAuth(validJwtToken);
      headers.setContentType(MediaType.APPLICATION_JSON);
      HttpEntity<Cliente> request = new HttpEntity<>(newCliente, headers);

      ResponseEntity<Cliente> response = restTemplate.postForEntity(getUrl("/api/clientes"), request, Cliente.class);

      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
      assertThat(response.getBody()).isNotNull();
      assertThat(response.getBody().getNombre()).isEqualTo("Test Cliente");
   }

   @Test
   @Order(2)
   void testUpdate() {
      cliente.setNombre("Cliente Actualizado");

      HttpHeaders headers = new HttpHeaders();
      headers.setBearerAuth(validJwtToken);
      headers.setContentType(MediaType.APPLICATION_JSON);
      HttpEntity<Cliente> request = new HttpEntity<>(cliente, headers);

      ResponseEntity<Cliente> response = restTemplate.exchange(getUrl("/api/clientes/" + cliente.getId()),
            HttpMethod.PUT, request,
            Cliente.class);

      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
      assertThat(response.getBody()).isNotNull();
      assertThat(response.getBody().getNombre()).isEqualTo("Cliente Actualizado");
   }

   @Test
   @Order(3)
   void testGetAll() {
      HttpHeaders headers = new HttpHeaders();
      headers.setBearerAuth(validJwtToken);
      HttpEntity<Void> request = new HttpEntity<>(headers);

      ResponseEntity<Cliente[]> response = restTemplate.exchange(
            getUrl("/api/clientes"),
            HttpMethod.GET,
            request,
            Cliente[].class);

      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
      assertThat(response.getBody()).isNotEmpty();
      assertThat(response.getBody()[0].getNombre()).isEqualTo("Test Cliente");
   }

   @Test
   @Order(4)
   void testGetById() {
      HttpHeaders headers = new HttpHeaders();
      headers.setBearerAuth(validJwtToken); // Establecer el token JWT
      HttpEntity<Void> request = new HttpEntity<>(headers);

      ResponseEntity<Cliente> response = restTemplate.exchange(
            getUrl("/api/clientes/" + cliente.getId()),
            HttpMethod.GET,
            request,
            Cliente.class);

      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
      assertThat(response.getBody()).isNotNull();
      assertThat(response.getBody().getNombre()).isEqualTo("Test Cliente");
      assertThat(response.getBody().getCuit()).isEqualTo("12998887776");
   }

   @Test
   @Order(5)
   void testGetById_NotFound() {
      HttpHeaders headers = new HttpHeaders();
      headers.setBearerAuth(validJwtToken); // Establecer el token JWT
      HttpEntity<Void> request = new HttpEntity<>(headers);

      ResponseEntity<Cliente> response = restTemplate.exchange(
            getUrl("/api/clientes/999"),
            HttpMethod.GET,
            request,
            Cliente.class);

      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
   }

   @Test
   @Order(6)
   void testDelete() {
      HttpHeaders headers = new HttpHeaders();
      headers.setBearerAuth(validJwtToken); // Establecer el token JWT
      HttpEntity<Void> request = new HttpEntity<>(headers);

      ResponseEntity<Void> response = restTemplate.exchange(
            getUrl("/api/clientes/" + cliente.getId()),
            HttpMethod.DELETE,
            request,
            Void.class);

      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
   }

   @Test
   @Order(7)
   void testVerificarSaldo_SaldoSuficiente() {
      HttpHeaders headers = new HttpHeaders();
      headers.setBearerAuth(validJwtToken); // Establecer el token JWT
      HttpEntity<Void> request = new HttpEntity<>(headers);

      ResponseEntity<Boolean> response = restTemplate.exchange(
            getUrl("/api/clientes/" + cliente.getId() + "/verificar-saldo?montoTotal=500.00"),
            HttpMethod.GET,
            request,
            Boolean.class);

      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
      assertThat(response.getBody()).isTrue();
   }

   @Test
   @Order(8)
   void testVerificarSaldo_SaldoInsuficiente() {
      HttpHeaders headers = new HttpHeaders();
      headers.setBearerAuth(validJwtToken); // Establecer el token JWT
      HttpEntity<Void> request = new HttpEntity<>(headers);

      ResponseEntity<Boolean> response = restTemplate.exchange(
            getUrl("/api/clientes/" + cliente.getId() + "/verificar-saldo?montoTotal=1500000.00"),
            HttpMethod.GET,
            request,
            Boolean.class);

      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
      assertThat(response.getBody()).isFalse();
   }

   @Test
   @Order(9)
   void testVerificarSaldo_ClienteNoEncontrado() {
      HttpHeaders headers = new HttpHeaders();
      headers.setBearerAuth(validJwtToken); // Establecer el token JWT
      HttpEntity<Void> request = new HttpEntity<>(headers);

      ResponseEntity<Boolean> response = restTemplate.exchange(
            getUrl("/api/clientes/999/verificar-saldo?montoTotal=500.00"),
            HttpMethod.GET,
            request,
            Boolean.class);

      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
   }

   private String getUrl(String path) {
      return "http://localhost:" + port + path;
   }

}