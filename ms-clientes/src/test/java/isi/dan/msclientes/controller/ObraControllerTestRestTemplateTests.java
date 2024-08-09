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
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import isi.dan.msclientes.aspect.JwtUtility;
import isi.dan.msclientes.model.Estado;
import isi.dan.msclientes.model.Obra;
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

   private Obra obra;

   @MockBean
   private JwtUtility jwtUtil;

   String validJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJpYXQiOjE3MjE2NzgzOTAsImV4cCI6MTcyMjI4MzE5MH0.4GsTGu0Yc9-irygXLqg6cCh05IES4VVHzgsxCp-y4cE";

   @BeforeEach
   void setUp() {
      // Crear una obra nueva para usar en cada prueba
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

      // Guardar la obra en la base de datos antes de cada prueba
      obra = obraService.save(obra);

      Claims claims = new DefaultClaims();
      claims.setSubject("user");

      when(jwtUtil.validateToken(anyString())).thenReturn(claims);
   }

   @AfterEach
   void tearDown() {
      // Limpiar la base de datos después de cada prueba
      obraService.deleteById(obra.getId());
   }

   @Test
   @Order(1)
   void testCreate() {
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
      newObra.setEstado(Estado.PENDIENTE);

      HttpHeaders headers = new HttpHeaders();
      headers.setBearerAuth(validJwtToken);
      headers.setContentType(MediaType.APPLICATION_JSON);
      HttpEntity<Obra> request = new HttpEntity<>(newObra, headers);

      ResponseEntity<Obra> response = restTemplate.postForEntity(getUrl("/api/obras"), request, Obra.class);

      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
      assertThat(response.getBody()).isNotNull();
      assertThat(response.getBody().getCalle()).isEqualTo("Avenida Siempreviva");
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
