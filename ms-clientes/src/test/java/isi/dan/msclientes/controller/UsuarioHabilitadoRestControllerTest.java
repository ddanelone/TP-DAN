package isi.dan.msclientes.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;

import isi.dan.msclientes.model.UsuarioHabilitado;
import isi.dan.msclientes.servicios.UsuarioHabilitadoService;

import java.util.Collections;
import java.util.Optional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ActiveProfiles("test")
public class UsuarioHabilitadoRestControllerTest {

   @Autowired
   private TestRestTemplate restTemplate;

   @MockBean
   private UsuarioHabilitadoService usuarioHabilitadoService;

   private UsuarioHabilitado usuarioHabilitado;

   @BeforeEach
   void setUp() {
      usuarioHabilitado = new UsuarioHabilitado();
      usuarioHabilitado.setId(1);
      usuarioHabilitado.setNombre("Juan");
      usuarioHabilitado.setApellido("Perez");
      usuarioHabilitado.setDni("12345678");
      usuarioHabilitado.setCorreoElectronico("juan.perez@example.com");
   }

   @Test
   @Order(1)
   void testGetAll() {
      Mockito.when(usuarioHabilitadoService.findAll()).thenReturn(Collections.singletonList(usuarioHabilitado));

      ResponseEntity<UsuarioHabilitado[]> response = restTemplate.getForEntity("/api/clientes/usuarios-habilitados",
            UsuarioHabilitado[].class);

      assertEquals(HttpStatus.OK, response.getStatusCode());
      UsuarioHabilitado[] usuariosHabilitados = response.getBody();
      assertNotNull(usuariosHabilitados);
      assertEquals(1, usuariosHabilitados.length);
      assertEquals("Juan", usuariosHabilitados[0].getNombre());
      assertEquals("Perez", usuariosHabilitados[0].getApellido());
      assertEquals("12345678", usuariosHabilitados[0].getDni());
      assertEquals("juan.perez@example.com", usuariosHabilitados[0].getCorreoElectronico());
   }

   @Test
   @Order(2)
   void testGetById() {
      Mockito.when(usuarioHabilitadoService.findById(1)).thenReturn(Optional.of(usuarioHabilitado));

      ResponseEntity<UsuarioHabilitado> response = restTemplate.getForEntity("/api/clientes/usuarios-habilitados/1",
            UsuarioHabilitado.class);

      assertEquals(HttpStatus.OK, response.getStatusCode());
      UsuarioHabilitado usuarioHabilitadoResponse = response.getBody();
      assertNotNull(usuarioHabilitadoResponse);
      assertEquals("Juan", usuarioHabilitadoResponse.getNombre());
      assertEquals("Perez", usuarioHabilitadoResponse.getApellido());
      assertEquals("12345678", usuarioHabilitadoResponse.getDni());
      assertEquals("juan.perez@example.com", usuarioHabilitadoResponse.getCorreoElectronico());
   }

   @Test
   @Order(3)
   void testCreate() {
      Mockito.when(usuarioHabilitadoService.save(Mockito.any(UsuarioHabilitado.class))).thenReturn(usuarioHabilitado);

      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON);
      HttpEntity<UsuarioHabilitado> request = new HttpEntity<>(usuarioHabilitado, headers);

      ResponseEntity<UsuarioHabilitado> response = restTemplate.postForEntity("/api/clientes/usuarios-habilitados",
            request, UsuarioHabilitado.class);

      assertEquals(HttpStatus.OK, response.getStatusCode());
      UsuarioHabilitado usuarioHabilitadoResponse = response.getBody();
      assertNotNull(usuarioHabilitadoResponse);
      assertEquals("Juan", usuarioHabilitadoResponse.getNombre());
      assertEquals("Perez", usuarioHabilitadoResponse.getApellido());
      assertEquals("12345678", usuarioHabilitadoResponse.getDni());
      assertEquals("juan.perez@example.com", usuarioHabilitadoResponse.getCorreoElectronico());
   }

   @Test
   @Order(4)
   void testUpdate() {
      Mockito.when(usuarioHabilitadoService.findById(1)).thenReturn(Optional.of(usuarioHabilitado));
      Mockito.when(usuarioHabilitadoService.update(Mockito.any(UsuarioHabilitado.class))).thenReturn(usuarioHabilitado);

      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON);
      HttpEntity<UsuarioHabilitado> request = new HttpEntity<>(usuarioHabilitado, headers);

      ResponseEntity<UsuarioHabilitado> response = restTemplate.exchange("/api/clientes/usuarios-habilitados/1",
            HttpMethod.PUT, request, UsuarioHabilitado.class);

      assertEquals(HttpStatus.OK, response.getStatusCode());
      UsuarioHabilitado usuarioHabilitadoResponse = response.getBody();
      assertNotNull(usuarioHabilitadoResponse);
      assertEquals("Juan", usuarioHabilitadoResponse.getNombre());
      assertEquals("Perez", usuarioHabilitadoResponse.getApellido());
      assertEquals("12345678", usuarioHabilitadoResponse.getDni());
      assertEquals("juan.perez@example.com", usuarioHabilitadoResponse.getCorreoElectronico());
   }

   @Test
   @Order(5)
   void testDelete() {
      Mockito.when(usuarioHabilitadoService.findById(1)).thenReturn(Optional.of(usuarioHabilitado));
      Mockito.doNothing().when(usuarioHabilitadoService).deleteById(1);

      ResponseEntity<Void> response = restTemplate.exchange("/api/clientes/usuarios-habilitados/1", HttpMethod.DELETE,
            null, Void.class);

      assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
   }
}