package isi.dan.msclientes.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import isi.dan.msclientes.aspect.JwtUtil;
import isi.dan.msclientes.model.UsuarioHabilitado;
import isi.dan.msclientes.servicios.UsuarioHabilitadoService;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Collections;
import java.util.Optional;

@SpringBootTest
@AutoConfigureMockMvc
public class UsuarioHabilitadoControllerTest {

   @Autowired
   private MockMvc mockMvc;

   @MockBean
   private UsuarioHabilitadoService usuarioHabilitadoService;

   private UsuarioHabilitado usuarioHabilitado;

   @MockBean
   private JwtUtil jwtUtil;

   String validJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJpYXQiOjE3MjE2NzgzOTAsImV4cCI6MTcyMjI4MzE5MH0.4GsTGu0Yc9-irygXLqg6cCh05IES4VVHzgsxCp-y4cE";

   @BeforeEach
   void setUp() {
      usuarioHabilitado = new UsuarioHabilitado();
      usuarioHabilitado.setId(1);
      usuarioHabilitado.setNombre("Juan");
      usuarioHabilitado.setApellido("Perez");
      usuarioHabilitado.setDni("12345678");
      usuarioHabilitado.setCorreoElectronico("juan.perez@example.com");

      when(jwtUtil.validateToken(anyString())).thenReturn(true);
   }

   @Test
   void testGetAll() throws Exception {
      Mockito.when(usuarioHabilitadoService.findAll()).thenReturn(Collections.singletonList(usuarioHabilitado));

      mockMvc.perform(get("/api/clientes/usuarios-habilitados").header("Authorization", "Bearer "
            + validJwtToken))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$[0].nombre").value("Juan"))
            .andExpect(jsonPath("$[0].apellido").value("Perez"))
            .andExpect(jsonPath("$[0].dni").value("12345678"))
            .andExpect(jsonPath("$[0].correoElectronico").value("juan.perez@example.com"));
   }

   @Test
   void testGetById() throws Exception {
      Mockito.when(usuarioHabilitadoService.findById(1)).thenReturn(Optional.of(usuarioHabilitado));

      mockMvc.perform(get("/api/clientes/usuarios-habilitados/1").header("Authorization", "Bearer "
            + validJwtToken))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.nombre").value("Juan"))
            .andExpect(jsonPath("$.apellido").value("Perez"))
            .andExpect(jsonPath("$.dni").value("12345678"))
            .andExpect(jsonPath("$.correoElectronico").value("juan.perez@example.com"));
   }

   @Test
   void testCreate() throws Exception {
      Mockito.when(usuarioHabilitadoService.save(Mockito.any(UsuarioHabilitado.class))).thenReturn(usuarioHabilitado);

      mockMvc.perform(post("/api/clientes/usuarios-habilitados")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(usuarioHabilitado)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nombre").value("Juan"))
            .andExpect(jsonPath("$.apellido").value("Perez"))
            .andExpect(jsonPath("$.dni").value("12345678"))
            .andExpect(jsonPath("$.correoElectronico").value("juan.perez@example.com"));
   }

   @Test
   void testUpdate() throws Exception {
      Mockito.when(usuarioHabilitadoService.findById(1)).thenReturn(Optional.of(usuarioHabilitado));
      Mockito.when(usuarioHabilitadoService.update(Mockito.any(UsuarioHabilitado.class))).thenReturn(usuarioHabilitado);

      mockMvc.perform(put("/api/clientes/usuarios-habilitados/1")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(usuarioHabilitado)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.nombre").value("Juan"))
            .andExpect(jsonPath("$.apellido").value("Perez"))
            .andExpect(jsonPath("$.dni").value("12345678"))
            .andExpect(jsonPath("$.correoElectronico").value("juan.perez@example.com"));
   }

   @Test
   void testDelete() throws Exception {
      Mockito.when(usuarioHabilitadoService.findById(1)).thenReturn(Optional.of(usuarioHabilitado));
      Mockito.doNothing().when(usuarioHabilitadoService).deleteById(1);

      mockMvc.perform(delete("/api/clientes/usuarios-habilitados/1").header("Authorization", "Bearer "
            + validJwtToken))
            .andExpect(status().isNoContent());
   }

   private static String asJsonString(final Object obj) {
      try {
         return new ObjectMapper().writeValueAsString(obj);
      } catch (Exception e) {
         throw new RuntimeException(e);
      }
   }
}
