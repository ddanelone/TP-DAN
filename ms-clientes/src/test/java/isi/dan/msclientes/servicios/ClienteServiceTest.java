package isi.dan.msclientes.servicios;

import java.math.BigDecimal;
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

import isi.dan.msclientes.dao.ClienteRepository;
import isi.dan.msclientes.excepcion.ResourceNotFoundException;
import isi.dan.msclientes.model.Cliente;

@ExtendWith(MockitoExtension.class)
public class ClienteServiceTest {

   @Mock
   private ClienteRepository clienteRepository;

   @InjectMocks
   private ClienteService clienteService;

   private Cliente cliente;

   @BeforeEach
   void setup() {
      cliente = Cliente.builder()
            .id(1)
            .nombre("nombre 1")
            .apellido("apellido 1")
            .dni("12345678")
            .cantidad_obras(1)
            .correoElectronico("correo1@gmail.com")
            .cuit("12-12345678-1")
            .maximoDescubierto(new BigDecimal(1000))
            .build();
   }

   @DisplayName("Test para guardar un Cliente")
   @Test
   void testGuardarCliente() {
      // given
      given(clienteRepository.findByCorreoElectronico(cliente.getCorreoElectronico()))
            .willReturn(Optional.empty());
      given(clienteRepository.save(cliente)).willReturn(cliente);

      // when
      Cliente clienteGuardado = clienteService.save(cliente);

      // then
      assertThat(clienteGuardado).isNotNull();
   }

   @DisplayName("Test para guardar un cliente con Throw Exception")
   @Test
   void testGuardarClienteConThrowException() {
      // given
      given(clienteRepository.findByCorreoElectronico(cliente.getCorreoElectronico()))
            .willReturn(Optional.of(cliente));

      // when
      Exception exception = assertThrows(ResourceNotFoundException.class, () -> {
         clienteService.save(cliente);
      });

      // then
      String expectedMessage = "Cliente con correo electrónico ya existe";
      String actualMessage = exception.getMessage();
      assertThat(actualMessage).contains(expectedMessage);

      verify(clienteRepository, never()).save(any(Cliente.class));
   }

   @DisplayName("Test para listar a los clientes")
   @Test
   void testListarClientes() {
      // given
      Cliente cliente1 = Cliente.builder()
            .id(2)
            .nombre("nombre 2")
            .apellido("apellido 2")
            .dni("23456789")
            .cantidad_obras(2)
            .correoElectronico("correo2@gmail.com")
            .cuit("23-23456789-2")
            .maximoDescubierto(new BigDecimal(1100))
            .build();
      given(clienteRepository.findAll()).willReturn(List.of(cliente, cliente1));

      // when
      List<Cliente> clientes = clienteService.findAll();

      // then
      assertThat(clientes).isNotNull();
      assertThat(clientes.size()).isEqualTo(2);
   }

   @DisplayName("Test para retornar una lista vacia")
   @Test
   void testListarColeccionClientesVacia() {
      // given
      Cliente cliente1 = Cliente.builder()
            .id(1)
            .nombre("nombre 1")
            .apellido("apellido 1")
            .dni("12345678")
            .cantidad_obras(1)
            .correoElectronico("correo1@gmail.com")
            .cuit("12-12345678-1")
            .maximoDescubierto(new BigDecimal(1000))
            .build();
      given(clienteRepository.findAll()).willReturn(Collections.emptyList());

      // when
      List<Cliente> listaClientes = clienteService.findAll();

      // then
      assertThat(listaClientes).isEmpty();
      assertThat(listaClientes.size()).isEqualTo(0);
   }

   @DisplayName("Test para obtener un cliente por ID")
   @Test
   void testObtenerClientePorId() {
      // given
      given(clienteRepository.findById(1)).willReturn(Optional.of(cliente));

      // when
      Cliente clienteGuardado = clienteService.findById(cliente.getId()).get();

      // then
      assertThat(clienteGuardado).isNotNull();
   }

   @DisplayName("Test para actualizar un Cliente")
   @Test
   void testActualizarCliente() {
      // given
      given(clienteRepository.save(cliente)).willReturn(cliente);
      cliente.setCorreoElectronico("correoNuevo@gmail.com");
      cliente.setNombre("NombreNuevo");

      // when
      Cliente clienteActualizado = clienteService.update(cliente);

      // then
      assertThat(clienteActualizado.getCorreoElectronico()).isEqualTo("correoNuevo@gmail.com");
      assertThat(clienteActualizado.getNombre()).isEqualTo("NombreNuevo");
   }

   @DisplayName("Test para eliminar un cliente")
   @Test
   void testEliminarCliente() {
      // given
      Integer clienteId = 1;
      willDoNothing().given(clienteRepository).deleteById(clienteId);

      // when
      clienteService.deleteById(clienteId);

      // then
      verify(clienteRepository, times(1)).deleteById(clienteId);
   }

}
