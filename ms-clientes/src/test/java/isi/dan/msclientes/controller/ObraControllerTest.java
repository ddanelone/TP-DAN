package isi.dan.msclientes.controller;

import com.fasterxml.jackson.databind.ObjectMapper;

import isi.dan.msclientes.model.Obra;
import isi.dan.msclientes.servicios.GeocodingService;
import isi.dan.msclientes.servicios.ObraService;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ObraController.class)
public class ObraControllerTest {

   @Autowired
   private MockMvc mockMvc;

   @MockBean
   private ObraService obraService;

   @MockBean
   private GeocodingService geocodingService;

   private Obra obra;

   @BeforeEach
   void setUp() {
      obra = new Obra();
      obra.setId(1);
      obra.setCalle("calle 1");
      obra.setCiudad("ciudad 1");
      obra.setAltura("1111");
      obra.setProvincia("provincia 1");
      obra.setPais("pais 1");
      obra.setPresupuesto(BigDecimal.valueOf(100));
   }

   @Test
   void testGetAll() throws Exception {
      Mockito.when(obraService.findAll()).thenReturn(Collections.singletonList(obra));

      mockMvc.perform(get("/api/obras"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$[0].calle").value("calle 1"))
            .andExpect(jsonPath("$[0].ciudad").value("ciudad 1"))
            .andExpect(jsonPath("$[0].altura").value("1111"))
            .andExpect(jsonPath("$[0].provincia").value("provincia 1"))
            .andExpect(jsonPath("$[0].pais").value("pais 1"));
   }

   @Test
   void testGetById() throws Exception {
      Mockito.when(obraService.findById(1)).thenReturn(Optional.of(obra));

      mockMvc.perform(get("/api/obras/1"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("$.calle").value("calle 1"))
            .andExpect(jsonPath("$.ciudad").value("ciudad 1"))
            .andExpect(jsonPath("$.altura").value("1111"))
            .andExpect(jsonPath("$.provincia").value("provincia 1"))
            .andExpect(jsonPath("$.pais").value("pais 1"));
   }

   @Test
   void testCreate() throws Exception {
      Mockito.when(obraService.save(Mockito.any(Obra.class))).thenReturn(obra);

      mockMvc.perform(post("/api/obras")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(obra)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.calle").value("calle 1"))
            .andExpect(jsonPath("$.ciudad").value("ciudad 1"))
            .andExpect(jsonPath("$.altura").value("1111"))
            .andExpect(jsonPath("$.provincia").value("provincia 1"))
            .andExpect(jsonPath("$.pais").value("pais 1"));
   }

   @Test
   void testUpdate() throws Exception {
      Mockito.when(obraService.findById(1)).thenReturn(Optional.of(obra));
      Mockito.when(obraService.update(Mockito.any(Obra.class))).thenReturn(obra);

      mockMvc.perform(put("/api/obras/1")
            .contentType(MediaType.APPLICATION_JSON)
            .content(asJsonString(obra)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.calle").value("calle 1"))
            .andExpect(jsonPath("$.ciudad").value("ciudad 1"))
            .andExpect(jsonPath("$.altura").value("1111"))
            .andExpect(jsonPath("$.provincia").value("provincia 1"))
            .andExpect(jsonPath("$.pais").value("pais 1"));
   }

   @Test
   void testDelete() throws Exception {
      Mockito.when(obraService.findById(1)).thenReturn(Optional.of(obra));
      Mockito.doNothing().when(obraService).deleteById(1);

      mockMvc.perform(delete("/api/obras/1"))
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
