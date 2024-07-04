package isi.dan.msclientes.servicios;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import io.micrometer.observation.ObservationRegistry;
import isi.dan.msclientes.conf.MessageSenderService;
import isi.dan.msclientes.dao.ClienteRepository;
import isi.dan.msclientes.dao.UsuarioHabilitadoRepository;
import isi.dan.msclientes.excepcion.ResourceNotFoundException;
import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.model.UsuarioHabilitado;

@ExtendWith(MockitoExtension.class)
public class UsuarioHabilitadoServiceTest {

   @Mock
   private UsuarioHabilitadoRepository usuarioHabilitadoRepository;

   @InjectMocks
   private UsuarioHabilitadoService usuarioHabilitadoService;

   private UsuarioHabilitado usuarioHabilitado;

   @Mock
   private ClienteRepository clienteRepository;

   @Mock
   private MessageSenderService messageSenderService;

   @BeforeEach
   void setup() {
      Cliente cliente = Cliente.builder()
            .id(1)
            .nombre("Cliente 1")
            .build();

      usuarioHabilitado = UsuarioHabilitado.builder()
            .id(1)
            .nombre("Nombre 1")
            .apellido("Apellido 1")
            .dni("12345678")
            .correoElectronico("correo1@gmail.com")
            .cliente(cliente)
            .build();
   }

   @DisplayName("Test para guardar un UsuarioHabilitado")
   @Test
   void testGuardarUsuarioHabilitado() {
      // given
      given(usuarioHabilitadoRepository.findByCorreoElectronico(usuarioHabilitado.getCorreoElectronico()))
            .willReturn(Optional.empty());
      given(usuarioHabilitadoRepository.save(usuarioHabilitado)).willReturn(usuarioHabilitado);

      // when
      UsuarioHabilitado usuarioHabilitadoGuardado = usuarioHabilitadoService.save(usuarioHabilitado);

      // then
      assertThat(usuarioHabilitadoGuardado).isNotNull();
   }

   @DisplayName("Test para guardar un UsuarioHabilitado con Throw Exception")
   @Test
   void testGuardarUsuarioHabilitadoConThrowException() {
      // given
      given(usuarioHabilitadoRepository.findByCorreoElectronico(usuarioHabilitado.getCorreoElectronico()))
            .willReturn(Optional.of(usuarioHabilitado));

      // when
      Exception exception = assertThrows(ResourceNotFoundException.class, () -> {
         usuarioHabilitadoService.save(usuarioHabilitado);
      });

      // then
      String expectedMessage = "Usuario con ese correo electrónico ya existe";
      String actualMessage = exception.getMessage();
      assertThat(actualMessage).contains(expectedMessage);

      verify(usuarioHabilitadoRepository, never()).save(any(UsuarioHabilitado.class));
   }

   @DisplayName("Test para listar los UsuariosHabilitados")
   @Test
   void testListarUsuariosHabilitados() {
      // given
      Cliente cliente2 = Cliente.builder()
            .id(2)
            .nombre("Cliente 2")
            .build();

      UsuarioHabilitado usuarioHabilitado2 = UsuarioHabilitado.builder()
            .id(2)
            .nombre("Nombre 2")
            .apellido("Apellido 2")
            .dni("23456789")
            .correoElectronico("correo2@gmail.com")
            .cliente(cliente2)
            .build();

      given(usuarioHabilitadoRepository.findAll()).willReturn(List.of(usuarioHabilitado, usuarioHabilitado2));

      // when
      List<UsuarioHabilitado> usuariosHabilitados = usuarioHabilitadoService.findAll();

      // then
      assertThat(usuariosHabilitados).isNotNull();
      assertThat(usuariosHabilitados.size()).isEqualTo(2);
   }

   @DisplayName("Test para retornar una lista vacía de UsuariosHabilitados")
   @Test
   void testListarColeccionUsuariosHabilitadosVacia() {
      // given
      given(usuarioHabilitadoRepository.findAll()).willReturn(Collections.emptyList());

      // when
      List<UsuarioHabilitado> listaUsuariosHabilitados = usuarioHabilitadoService.findAll();

      // then
      assertThat(listaUsuariosHabilitados).isEmpty();
      assertThat(listaUsuariosHabilitados.size()).isEqualTo(0);
   }

   @DisplayName("Test para obtener un UsuarioHabilitado por ID")
   @Test
   void testObtenerUsuarioHabilitadoPorId() {
      // given
      given(usuarioHabilitadoRepository.findById(1)).willReturn(Optional.of(usuarioHabilitado));

      // when
      UsuarioHabilitado usuarioHabilitadoGuardado = usuarioHabilitadoService.findById(usuarioHabilitado.getId()).get();

      // then
      assertThat(usuarioHabilitadoGuardado).isNotNull();
   }

   @DisplayName("Test para actualizar un UsuarioHabilitado")
   @Test
   void testActualizarUsuarioHabilitado() {
      // given
      given(usuarioHabilitadoRepository.save(usuarioHabilitado)).willReturn(usuarioHabilitado);
      usuarioHabilitado.setCorreoElectronico("correoNuevo@gmail.com");
      usuarioHabilitado.setNombre("NombreNuevo");

      // when
      UsuarioHabilitado usuarioHabilitadoActualizado = usuarioHabilitadoService.update(usuarioHabilitado);

      // then
      assertThat(usuarioHabilitadoActualizado.getCorreoElectronico()).isEqualTo("correoNuevo@gmail.com");
      assertThat(usuarioHabilitadoActualizado.getNombre()).isEqualTo("NombreNuevo");
   }

   @DisplayName("Test para eliminar un UsuarioHabilitado")
   @Test
   void testEliminarUsuarioHabilitado() {
      // given
      Integer usuarioHabilitadoId = 1;
      willDoNothing().given(usuarioHabilitadoRepository).deleteById(usuarioHabilitadoId);

      // when
      usuarioHabilitadoService.deleteById(usuarioHabilitadoId);

      // then
      verify(usuarioHabilitadoRepository, times(1)).deleteById(usuarioHabilitadoId);
   }
}
