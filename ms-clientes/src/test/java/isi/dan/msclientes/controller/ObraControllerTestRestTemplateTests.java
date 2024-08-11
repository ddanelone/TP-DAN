package isi.dan.msclientes.controller;

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

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.impl.DefaultClaims;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import isi.dan.msclientes.aspect.JwtUtility;
import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.model.Estado;
import isi.dan.msclientes.model.Obra;
import isi.dan.msclientes.servicios.ClienteService;
import isi.dan.msclientes.servicios.ObraService;

import java.math.BigDecimal;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ActiveProfiles("test")
public class ObraControllerTestRestTemplateTests {

   @LocalServerPort
   private int port;

   @Autowired
   private TestRestTemplate restTemplate;

   @Autowired
   private ObraService obraService;

   @Autowired
   private ClienteService clienteService;

   private Obra obra;

   @MockBean
   private JwtUtility jwtUtil;

   String validJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJpYXQiOjE3MjE2NzgzOTAsImV4cCI6MTcyMjI4MzE5MH0.4GsTGu0Yc9-irygXLqg6cCh05IES4VVHzgsxCp-y4cE";

   @BeforeEach
   void setUp() {
      // Crear un cliente nuevo para usar en cada prueba
      Cliente cliente = new Cliente();
      cliente.setNombre("Cliente Test");
      cliente.setApellido("Apellido Test");
      cliente.setDni("12345678");
      cliente.setCantidad_obras(3);
      cliente.setCorreoElectronico("test@example.com");
      cliente.setCuit("20-12345678-9");
      cliente.setMaximoDescubierto(new BigDecimal("50000.00"));
      clienteService.save(cliente);

      // Asignar el cliente a la obra
      obra = new Obra();
      obra.setCalle("Calle Falsa");
      obra.setCiudad("Ciudad Test");
      obra.setProvincia("Provincia Test");
      obra.setPais("Pais Test");
      obra.setAltura("123");
      obra.setEsRemodelacion(false);
      obra.setLat(-34.603722f);
      obra.setLng(-58.381592f);
      obra.setPresupuesto(new BigDecimal("10000.00"));
      obra.setEstado(Estado.HABILITADA);
      obra.setCliente(cliente);

      // Guardar la obra en la base de datos antes de cada prueba
      obra = obraService.save(obra);

      Claims claims = new DefaultClaims();
      claims.setSubject("user");

      when(jwtUtil.validateToken(anyString())).thenReturn(claims);

   }

   @AfterEach
   void tearDown() {
      // Eliminar la obra y cliente creado después de cada prueba
      if (obra != null && obra.getId() != null) {
         obraService.deleteById(obra.getId());
      }
      if (obra.getCliente() != null) {
         clienteService.deleteById(obra.getCliente().getId());
      }
   }

   @Test
   @Order(1)
   void testCreate() {
      Cliente cliente = new Cliente();
      cliente.setNombre("Cliente Test 1");
      cliente.setApellido("Apellido Test 1");
      cliente.setDni("11234567");
      cliente.setCantidad_obras(3);
      cliente.setCorreoElectronico("test1@example.com");
      cliente.setCuit("20-11234567-9");
      cliente.setMaximoDescubierto(new BigDecimal("50000.00"));
      clienteService.save(cliente);

      Obra newObra = new Obra();
      newObra.setCalle("Avenida Siempreviva");
      newObra.setCiudad("Ciudad Nueva");
      newObra.setProvincia("Provincia Nueva");
      newObra.setPais("Pais Nuevo");
      newObra.setAltura("742");
      newObra.setEsRemodelacion(true);
      newObra.setLat(-34.603722f);
      newObra.setLng(-58.381592f);
      newObra.setPresupuesto(new BigDecimal("20000.00"));
      newObra.setEstado(Estado.HABILITADA);
      newObra.setCliente(cliente);

      HttpHeaders headers = new HttpHeaders();
      headers.setBearerAuth(validJwtToken);
      headers.setContentType(MediaType.APPLICATION_JSON);
      HttpEntity<Obra> request = new HttpEntity<>(newObra, headers);

      ResponseEntity<Obra> response = restTemplate.exchange(getUrl("/api/obras"), HttpMethod.POST,
            request, Obra.class);

      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
      assertThat(response.getBody()).isNotNull();
      assertThat(response.getBody().getCalle()).isEqualTo("Avenida Siempreviva");

      // Verificar estado actualizado
      assertThat(response.getBody().getEstado()).isEqualTo(Estado.HABILITADA);
   }

   @Test
   @Order(2)
   void testUpdate() {
      obra.setCalle("Calle Actualizada");

      HttpHeaders headers = new HttpHeaders();
      headers.setBearerAuth(validJwtToken);
      headers.setContentType(MediaType.APPLICATION_JSON);
      HttpEntity<Obra> request = new HttpEntity<>(obra, headers);

      ResponseEntity<Obra> response = restTemplate.exchange(getUrl("/api/obras/" + obra.getId()), HttpMethod.PUT,
            request, Obra.class);

      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
      assertThat(response.getBody()).isNotNull();
      assertThat(response.getBody().getCalle()).isEqualTo("Calle Actualizada");
   }

   @Test
   @Order(3)
   void testGetAll() {

      HttpHeaders headers = new HttpHeaders();
      headers.setBearerAuth(validJwtToken);
      HttpEntity<Void> request = new HttpEntity<>(headers);

      ResponseEntity<Obra[]> response = restTemplate.exchange(getUrl("/api/obras"), HttpMethod.GET,
            request, Obra[].class);

      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
      assertThat(response.getBody()).isNotEmpty();
      assertThat(response.getBody()[0].getCalle()).isEqualTo("Avenida Siempreviva");
   }

   @Test
   @Order(4)
   void testGetById() {
      HttpHeaders headers = new HttpHeaders();
      headers.setBearerAuth(validJwtToken);
      HttpEntity<Void> request = new HttpEntity<>(headers);

      ResponseEntity<Obra> response = restTemplate.exchange(getUrl("/api/obras/" + obra.getId()), HttpMethod.GET,
            request, Obra.class);

      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
      assertThat(response.getBody()).isNotNull();
      assertThat(response.getBody().getCalle()).isEqualTo("Calle Falsa");
   }

   @Test
   @Order(5)
   void testGetById_NotFound() {
      HttpHeaders headers = new HttpHeaders();
      headers.setBearerAuth(validJwtToken);
      HttpEntity<Void> request = new HttpEntity<>(headers);

      ResponseEntity<Obra> response = restTemplate.exchange(getUrl("/api/obras/999"), HttpMethod.GET, request,
            Obra.class);

      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
   }

   @Test
   @Order(6)
   void testDelete() {
      HttpHeaders headers = new HttpHeaders();
      headers.setBearerAuth(validJwtToken);
      HttpEntity<Void> request = new HttpEntity<>(headers);

      ResponseEntity<Void> response = restTemplate.exchange(getUrl("/api/obras/" + obra.getId()), HttpMethod.DELETE,
            request, Void.class);

      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
   }

   private String getUrl(String path) {
      return "http://localhost:" + port + path;
   }
}
