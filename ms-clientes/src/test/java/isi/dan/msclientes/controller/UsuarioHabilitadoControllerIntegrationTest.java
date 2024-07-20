package isi.dan.msclientes.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.hamcrest.Matchers.hasSize;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Order;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.model.UsuarioHabilitado;
import isi.dan.msclientes.servicios.UsuarioHabilitadoService;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class UsuarioHabilitadoControllerIntegrationTest {

   @Autowired
   private MockMvc mockMvc;

   @MockBean
   private UsuarioHabilitadoService usuarioHabilitadoService;

   @BeforeEach
   void setUp() {
      MockitoAnnotations.openMocks(this);
   }

   @Test
   @Order(1)
   public void testSaveUsuarioHabilitado() throws Exception {
      UsuarioHabilitado usuario = UsuarioHabilitado.builder().id(1).correoElectronico("test@example.com").build();
      when(usuarioHabilitadoService.findById(1)).thenReturn(Optional.empty());
      when(usuarioHabilitadoService.save(any(UsuarioHabilitado.class))).thenReturn(usuario);

      mockMvc.perform(post("/api/clientes/usuarios-habilitados")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"id\":1,\"correoElectronico\":\"test@example.com\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.correoElectronico").value("test@example.com"));
   }

   @Test
   @Order(2)
   public void testFindAllUsuarios() throws Exception {
      List<UsuarioHabilitado> usuarios = new ArrayList<>();
      usuarios.add(UsuarioHabilitado.builder().id(1).correoElectronico("test1@example.com").build());
      usuarios.add(UsuarioHabilitado.builder().id(2).correoElectronico("test2@example.com").build());
      when(usuarioHabilitadoService.findAll()).thenReturn(usuarios);

      mockMvc.perform(get("/api/clientes/usuarios-habilitados")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(2)))
            .andExpect(jsonPath("$[0].correoElectronico").value("test1@example.com"))
            .andExpect(jsonPath("$[1].correoElectronico").value("test2@example.com"));
   }

   @Test
   @Order(3)
   public void testFindByIdUsuario() throws Exception {
      UsuarioHabilitado usuario = UsuarioHabilitado.builder().id(1).correoElectronico("test@example.com").build();
      when(usuarioHabilitadoService.findById(1)).thenReturn(Optional.of(usuario));

      mockMvc.perform(get("/api/clientes/usuarios-habilitados/1")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.correoElectronico").value("test@example.com"));
   }

   @Test
   @Order(4)
   public void testDeleteUsuario() throws Exception {
      when(usuarioHabilitadoService.findById(1)).thenReturn(Optional.of(UsuarioHabilitado.builder().id(1).build()));
      doNothing().when(usuarioHabilitadoService).deleteById(1);

      mockMvc.perform(delete("/api/clientes/usuarios-habilitados/1")
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());
   }

   @Test
   @Order(5)
   public void testUpdateUsuario() throws Exception {
      UsuarioHabilitado usuario = UsuarioHabilitado.builder().id(1).correoElectronico("test@example.com").build();
      when(usuarioHabilitadoService.findById(1)).thenReturn(Optional.of(usuario));
      when(usuarioHabilitadoService.update(any(UsuarioHabilitado.class))).thenReturn(usuario);

      mockMvc.perform(put("/api/clientes/usuarios-habilitados/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"id\":1,\"correoElectronico\":\"test@example.com\"}"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.correoElectronico").value("test@example.com"));
   }

   @Test
   @Order(6)
   public void testUpdateClienteUsuariosHabilitados() throws Exception {
      Cliente cliente = Cliente.builder().id(1).build();
      UsuarioHabilitado usuario1 = UsuarioHabilitado.builder().id(1).correoElectronico("test1@example.com").build();
      UsuarioHabilitado usuario2 = UsuarioHabilitado.builder().id(2).correoElectronico("test2@example.com").build();
      List<UsuarioHabilitado> usuarios = List.of(usuario1, usuario2);

      when(usuarioHabilitadoService.updateClienteUsuariosHabilitados(1, usuarios)).thenReturn(cliente);

      mockMvc.perform(put("/api/clientes/usuarios-habilitados/update-usuarios-habilitados/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content("[{\"id\":1,\"correoElectronico\":\"test1@example.com\"}," +
                  "{\"id\":2,\"correoElectronico\":\"test2@example.com\"}]"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1));
   }
}