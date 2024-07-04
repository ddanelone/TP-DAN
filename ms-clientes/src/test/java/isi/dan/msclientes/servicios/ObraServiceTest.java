package isi.dan.msclientes.servicios;

import static org.junit.Assert.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

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
}
