package isi.dan.msclientes.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.impl.DefaultClaims;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.MethodOrderer;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.test.web.client.MockRestServiceServer;

import isi.dan.msclientes.aspect.JwtUtility;
import isi.dan.msclientes.model.Estado;
import isi.dan.msclientes.model.Obra;
import isi.dan.msclientes.servicios.GeocodingService;
import isi.dan.msclientes.servicios.ObraService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class ObraControllerMockRestServiceServerTests {

   @Autowired
   private MockMvc mockMvc;

   @MockBean
   private ObraService obraService;

   @MockBean
   private GeocodingService geocodingService;

   @Autowired
   private TestRestTemplate restTemplate;

   @Autowired
   private ObjectMapper objectMapper;

   private MockRestServiceServer mockRestServiceServer;

   @MockBean
   private JwtUtility jwtUtil;

   String validJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJpYXQiOjE3MjE2NzgzOTAsImV4cCI6MTcyMjI4MzE5MH0.4GsTGu0Yc9-irygXLqg6cCh05IES4VVHzgsxCp-y4cE";

   @BeforeEach
   public void setUp() {
      mockRestServiceServer = MockRestServiceServer.createServer(restTemplate.getRestTemplate());

      Claims claims = new DefaultClaims();
      claims.setSubject("user");

      when(jwtUtil.validateToken(anyString())).thenReturn(claims);
   }

   @Test
   @Order(1)
   public void testGetAllObras() throws Exception {
      List<Obra> obras = Arrays.asList(
            Obra.builder().id(1).calle("Calle1").ciudad("Ciudad1").provincia("Provincia1").pais("Pais1").altura("123")
                  .presupuesto(BigDecimal.valueOf(1000)).estado(Estado.HABILITADA).build(),
            Obra.builder().id(2).calle("Calle2").ciudad("Ciudad2").provincia("Provincia2").pais("Pais2").altura("456")
                  .presupuesto(BigDecimal.valueOf(2000)).estado(Estado.PENDIENTE).build());
      when(obraService.findAll()).thenReturn(obras);

      mockMvc.perform(get("/api/obras")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(2)))
            .andExpect(jsonPath("$[0].id").value(1))
            .andExpect(jsonPath("$[0].calle").value("Calle1"))
            .andExpect(jsonPath("$[0].ciudad").value("Ciudad1"))
            .andExpect(jsonPath("$[0].provincia").value("Provincia1"))
            .andExpect(jsonPath("$[0].pais").value("Pais1"))
            .andExpect(jsonPath("$[0].altura").value("123"))
            .andExpect(jsonPath("$[0].presupuesto").value(1000))
            .andExpect(jsonPath("$[0].estado").value("HABILITADA"))
            .andExpect(jsonPath("$[1].id").value(2))
            .andExpect(jsonPath("$[1].calle").value("Calle2"))
            .andExpect(jsonPath("$[1].ciudad").value("Ciudad2"))
            .andExpect(jsonPath("$[1].provincia").value("Provincia2"))
            .andExpect(jsonPath("$[1].pais").value("Pais2"))
            .andExpect(jsonPath("$[1].altura").value("456"))
            .andExpect(jsonPath("$[1].presupuesto").value(2000))
            .andExpect(jsonPath("$[1].estado").value("PENDIENTE"));
   }

   @Test
   @Order(2)
   public void testGetEstados() throws Exception {
      List<Estado> estados = Arrays.asList(Estado.HABILITADA, Estado.PENDIENTE, Estado.FINALIZADA);
      when(obraService.findStates()).thenReturn(estados);

      mockMvc.perform(get("/api/obras/estados")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(3)))
            .andExpect(jsonPath("$[0]").value("HABILITADA"))
            .andExpect(jsonPath("$[1]").value("PENDIENTE"))
            .andExpect(jsonPath("$[2]").value("FINALIZADA"));
   }

   @Test
   @Order(3)
   public void testGetObraById() throws Exception {
      Obra obra = Obra.builder().id(1).calle("Calle1").ciudad("Ciudad1").provincia("Provincia1").pais("Pais1")
            .altura("123").presupuesto(BigDecimal.valueOf(1000)).estado(Estado.HABILITADA).build();
      when(obraService.findById(1)).thenReturn(Optional.of(obra));

      mockMvc.perform(get("/api/obras/1")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.calle").value("Calle1"))
            .andExpect(jsonPath("$.ciudad").value("Ciudad1"))
            .andExpect(jsonPath("$.provincia").value("Provincia1"))
            .andExpect(jsonPath("$.pais").value("Pais1"))
            .andExpect(jsonPath("$.altura").value("123"))
            .andExpect(jsonPath("$.presupuesto").value(1000))
            .andExpect(jsonPath("$.estado").value("HABILITADA"));
   }

   @Test
   @Order(4)
   public void testGetObraByIdNotFound() throws Exception {
      when(obraService.findById(1)).thenReturn(Optional.empty());

      mockMvc.perform(get("/api/obras/1")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNotFound());
   }

   @Test
   @Order(5)
   public void testCreateObra() throws Exception {
      Obra obra = Obra.builder().calle("Calle1").ciudad("Ciudad1").provincia("Provincia1").pais("Pais1").altura("123")
            .presupuesto(BigDecimal.valueOf(1000)).estado(Estado.HABILITADA).build();
      Obra savedObra = Obra.builder().id(1).calle("Calle1").ciudad("Ciudad1").provincia("Provincia1").pais("Pais1")
            .altura("123").presupuesto(BigDecimal.valueOf(1000)).estado(Estado.HABILITADA).build();

      when(obraService.save(any(Obra.class))).thenReturn(savedObra);

      mockMvc.perform(post("/api/obras")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(obra)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.calle").value("Calle1"))
            .andExpect(jsonPath("$.ciudad").value("Ciudad1"))
            .andExpect(jsonPath("$.provincia").value("Provincia1"))
            .andExpect(jsonPath("$.pais").value("Pais1"))
            .andExpect(jsonPath("$.altura").value("123"))
            .andExpect(jsonPath("$.presupuesto").value(1000))
            .andExpect(jsonPath("$.estado").value("HABILITADA"));
   }

   @Test
   @Order(6)
   public void testUpdateObra() throws Exception {
      Obra obra = Obra.builder().id(1).calle("Calle1").ciudad("Ciudad1").provincia("Provincia1").pais("Pais1")
            .altura("123").presupuesto(BigDecimal.valueOf(1000)).estado(Estado.HABILITADA).build();
      Obra updatedObra = Obra.builder().id(1).calle("Calle1 Actualizada").ciudad("Ciudad1 Actualizada")
            .provincia("Provincia1 Actualizada").pais("Pais1 Actualizado").altura("456")
            .presupuesto(BigDecimal.valueOf(1500)).estado(Estado.FINALIZADA).build();

      when(obraService.findById(1)).thenReturn(Optional.of(obra));
      when(obraService.update(any(Obra.class))).thenReturn(updatedObra);

      mockMvc.perform(put("/api/obras/1")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(updatedObra)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(1))
            .andExpect(jsonPath("$.calle").value("Calle1 Actualizada"))
            .andExpect(jsonPath("$.ciudad").value("Ciudad1 Actualizada"))
            .andExpect(jsonPath("$.provincia").value("Provincia1 Actualizada"))
            .andExpect(jsonPath("$.pais").value("Pais1 Actualizado"))
            .andExpect(jsonPath("$.altura").value("456"))
            .andExpect(jsonPath("$.presupuesto").value(1500))
            .andExpect(jsonPath("$.estado").value("FINALIZADA"));
   }

   @Test
   @Order(7)
   public void testUpdateObraNotFound() throws Exception {
      when(obraService.findById(1)).thenReturn(Optional.empty());

      mockMvc.perform(put("/api/obras/1")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(
                  Obra.builder().id(1).calle("Calle1").ciudad("Ciudad1").provincia("Provincia1").pais("Pais1")
                        .altura("123").presupuesto(BigDecimal.valueOf(1000)).estado(Estado.HABILITADA).build())))
            .andExpect(status().isNotFound());
   }

   @Test
   @Order(8)
   public void testDeleteObra() throws Exception {
      Obra obra = Obra.builder().id(1).calle("Calle1").ciudad("Ciudad1").provincia("Provincia1").pais("Pais1")
            .altura("123").presupuesto(BigDecimal.valueOf(1000)).estado(Estado.HABILITADA).build();
      when(obraService.findById(1)).thenReturn(Optional.of(obra));
      doNothing().when(obraService).deleteById(1);

      mockMvc.perform(delete("/api/obras/1")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent()); // Cambiar aquí a .isNoContent()
   }

   @Test
   @Order(9)
   public void testDeleteObraNotFound() throws Exception {
      when(obraService.findById(1)).thenReturn(Optional.empty());

      mockMvc.perform(delete("/api/obras/1")
            .header("Authorization", "Bearer " + validJwtToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isNotFound());
   }
}
