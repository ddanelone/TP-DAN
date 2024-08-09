package isi.dan.msclientes.servicios;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import isi.dan.msclientes.dao.ObraRepository;
import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.model.Estado;
import isi.dan.msclientes.model.Obra;

@ExtendWith(MockitoExtension.class)
public class ObraServiceTest {

   @Mock
   private ObraRepository obraRepository;

   @InjectMocks
   private ObraService obraService;

   private Obra obra;

   private final int CANTIDAD_MAXIMA_OBRAS_HABILITADAS = 3;

   @BeforeEach
   void setup() {
      Cliente cliente = Cliente.builder()
            .id(1)
            .nombre("Cliente 1")
            .build();

      obra = Obra.builder()
            .id(1)
            .calle("Calle 1")
            .ciudad("Ciudad 1")
            .provincia("Provincia 1")
            .pais("Pais 1")
            .altura("Altura 1")
            .esRemodelacion(true)
            .lat(10.0f)
            .lng(20.0f)
            .cliente(cliente)
            .presupuesto(new BigDecimal("10000"))
            .estado(Estado.PENDIENTE)
            .build();
   }

   @DisplayName("Test para guardar una Obra")
   @Test
   void testGuardarObra() {
      // given
      given(obraRepository.save(obra)).willReturn(obra);

      // when
      Obra obraGuardada = obraService.save(obra);

      // then
      assertThat(obraGuardada).isNotNull();
   }

   @DisplayName("Test para listar las Obras")
   @Test
   void testListarObras() {
      // given
      Cliente cliente2 = Cliente.builder()
            .id(2)
            .nombre("Cliente 2")
            .build();

      Obra obra2 = Obra.builder()
            .id(2)
            .calle("Calle 2")
            .ciudad("Ciudad 2")
            .provincia("Provincia 2")
            .pais("Pais 2")
            .altura("Altura 2")
            .esRemodelacion(false)
            .lat(30.0f)
            .lng(40.0f)
            .cliente(cliente2)
            .presupuesto(new BigDecimal("20000"))
            .estado(Estado.PENDIENTE)
            .build();

      given(obraRepository.findAll()).willReturn(List.of(obra, obra2));

      // when
      List<Obra> obras = obraService.findAll();

      // then
      assertThat(obras).isNotNull();
      assertThat(obras.size()).isEqualTo(2);
   }

   @DisplayName("Test para retornar una lista vacía de Obras")
   @Test
   void testListarColeccionObrasVacia() {
      // given
      given(obraRepository.findAll()).willReturn(Collections.emptyList());

      // when
      List<Obra> listaObras = obraService.findAll();

      // then
      assertThat(listaObras).isEmpty();
      assertThat(listaObras.size()).isEqualTo(0);
   }

   @DisplayName("Test para obtener una Obra por ID")
   @Test
   void testObtenerObraPorId() {
      // given
      given(obraRepository.findById(1)).willReturn(Optional.of(obra));

      // when
      Obra obraGuardada = obraService.findById(obra.getId()).get();

      // then
      assertThat(obraGuardada).isNotNull();
   }

   @DisplayName("Test para actualizar una Obra")
   @Test
   void testActualizarObra() {
      // given
      given(obraRepository.save(obra)).willReturn(obra);
      obra.setCalle("Calle Nueva");
      obra.setCiudad("Ciudad Nueva");

      // when
      Obra obraActualizada = obraService.update(obra);

      // then
      assertThat(obraActualizada.getCalle()).isEqualTo("Calle Nueva");
      assertThat(obraActualizada.getCiudad()).isEqualTo("Ciudad Nueva");
   }

   @DisplayName("Test para eliminar una Obra")
   @Test
   void testEliminarObra() {
      // given
      Integer obraId = 1;
      willDoNothing().given(obraRepository).deleteById(obraId);

      // when
      obraService.deleteById(obraId);

      // then
      verify(obraRepository, times(1)).deleteById(obraId);
   }

   @DisplayName("Test para validar una obra HABILITADA que excede la cantidad máxima")
   @Test
   void testValidarObraHabilitadaExcedeMaximo() {
      // given
      obra.setEstado(Estado.HABILITADA);

      // Simulando 3 obras habilitadas
      Obra obra1 = new Obra();
      obra1.setEstado(Estado.HABILITADA);
      Obra obra2 = new Obra();
      obra2.setEstado(Estado.HABILITADA);
      Obra obra3 = new Obra();
      obra3.setEstado(Estado.HABILITADA);

      List<Obra> obrasHabilitadas = Arrays.asList(obra1, obra2, obra3);
      given(obraRepository.findByClienteId(obra.getCliente().getId())).willReturn(obrasHabilitadas);

      // Log para verificar los estados de las obras
      // System.out.println("Estados de las obras simuladas: "
      // +
      // obrasHabilitadas.stream().map(Obra::getEstado).collect(Collectors.toList()));

      // when
      ResponseEntity<Map<String, Object>> response = obraService.validarObra(obra.getCliente().getId(), obra,
            CANTIDAD_MAXIMA_OBRAS_HABILITADAS);

      // then
      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
      assertThat(response.getBody()).isNotNull();
      assertThat(response.getBody().get("status")).isEqualTo(400);
      assertThat(response.getBody().get("message")).isEqualTo("Superó el máximo de obras habilitadas, actualmente: 3");
   }

   @DisplayName("Test para validar una obra FINALIZADA con obra PENDIENTE disponible")
   @Test
   void testValidarObraFinalizadaConObraPendienteDisponible() {
      // given
      obra.setEstado(Estado.FINALIZADA);
      Obra obraPendiente = Obra.builder()
            .id(2)
            .calle("Calle Pendiente")
            .ciudad("Ciudad Pendiente")
            .provincia("Provincia Pendiente")
            .pais("Pais Pendiente")
            .altura("Altura Pendiente")
            .esRemodelacion(false)
            .lat(30.0f)
            .lng(40.0f)
            .cliente(obra.getCliente())
            .presupuesto(new BigDecimal("20000"))
            .estado(Estado.PENDIENTE)
            .build();
      given(obraRepository.findByClienteId(obra.getCliente().getId())).willReturn(Arrays.asList(obraPendiente));
      given(obraRepository.save(Mockito.any(Obra.class))).willAnswer(invocation -> invocation.getArgument(0));

      // when
      ResponseEntity<Map<String, Object>> response = obraService.validarObra(obra.getCliente().getId(), obra,
            CANTIDAD_MAXIMA_OBRAS_HABILITADAS);

      // then
      assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
      assertThat(response.getBody()).isNotNull();
      assertThat(response.getBody().get("status")).isEqualTo(200);
      assertThat(response.getBody().get("message")).isEqualTo(obraPendiente);
   }

}