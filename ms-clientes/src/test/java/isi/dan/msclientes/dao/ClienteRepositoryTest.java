package isi.dan.msclientes.dao;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import isi.dan.msclientes.model.Cliente;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@Testcontainers
@ActiveProfiles("db")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ClienteRepositoryTest {
   Logger log = LoggerFactory.getLogger(ClienteRepositoryTest.class);

   @Container
   public static MySQLContainer<?> mysqlContainer = new MySQLContainer<>("mysql:8.0")
         .withDatabaseName("testdb")
         .withUsername("test")
         .withPassword("test");

   @Autowired
   private ClienteRepository clienteRepository;

   @DynamicPropertySource
   static void configureProperties(DynamicPropertyRegistry registry) {
      registry.add("spring.datasource.url", mysqlContainer::getJdbcUrl);
      registry.add("spring.datasource.username", mysqlContainer::getUsername);
      registry.add("spring.datasource.password", mysqlContainer::getPassword);
   }

   @BeforeEach
   void iniciarDatos() {
      Cliente cliente = new Cliente();
      cliente.setNombre("Nombre 2");
      cliente.setApellido("Apellido 2");
      cliente.setDni("22222222");
      cliente.setCantidad_obras(1);
      cliente.setCorreoElectronico("correo2@example.com");
      cliente.setCuit("20-22222222-2");
      cliente.setMaximoDescubierto(BigDecimal.valueOf(5000));
      clienteRepository.save(cliente);
   }

   @BeforeEach
   void borrarDatos() {
      clienteRepository.deleteAll();
   }

   @AfterAll
   static void stopContainer() {
      mysqlContainer.stop();
   }

   @Test
   void testSaveAndFindById() {
      Cliente cliente = new Cliente();
      cliente.setNombre("Nombre 1");
      cliente.setApellido("Apellido 1");
      cliente.setDni("11111111");
      cliente.setCantidad_obras(2);
      cliente.setCorreoElectronico("correo1@example.com");
      cliente.setCuit("20-11111111-1");
      cliente.setMaximoDescubierto(BigDecimal.valueOf(10000));
      clienteRepository.save(cliente);

      Optional<Cliente> foundCliente = clienteRepository.findById(cliente.getId());
      log.info("ENCONTRE: {} ", foundCliente);
      assertThat(foundCliente).isPresent();
      assertThat(foundCliente.get().getNombre()).isEqualTo("Nombre 1");
      assertThat(foundCliente.get().getApellido()).isEqualTo("Apellido 1");
      assertThat(foundCliente.get().getDni()).isEqualTo("11111111");
      assertThat(foundCliente.get().getCantidad_obras()).isEqualTo(2);
      assertThat(foundCliente.get().getCorreoElectronico()).isEqualTo("correo1@example.com");
      assertThat(foundCliente.get().getCuit()).isEqualTo("20-11111111-1");
      assertThat(foundCliente.get().getMaximoDescubierto()).isEqualTo(BigDecimal.valueOf(10000));
   }

   @Test
   void testFindByCorreoElectronico() {
      Cliente cliente = new Cliente();
      cliente.setNombre("Nombre 1");
      cliente.setApellido("Apellido 1");
      cliente.setDni("11111111");
      cliente.setCantidad_obras(2);
      cliente.setCorreoElectronico("correo1@example.com");
      cliente.setCuit("20-11111111-1");
      cliente.setMaximoDescubierto(BigDecimal.valueOf(10000));
      clienteRepository.save(cliente);

      Optional<Cliente> foundCliente = clienteRepository.findByCorreoElectronico("correo1@example.com");
      log.info("ENCONTRE: {} ", foundCliente);
      assertThat(foundCliente).isPresent();
      assertThat(foundCliente.get().getNombre()).isEqualTo("Nombre 1");
      assertThat(foundCliente.get().getApellido()).isEqualTo("Apellido 1");
      assertThat(foundCliente.get().getDni()).isEqualTo("11111111");
      assertThat(foundCliente.get().getCantidad_obras()).isEqualTo(2);
      assertThat(foundCliente.get().getCorreoElectronico()).isEqualTo("correo1@example.com");
      assertThat(foundCliente.get().getCuit()).isEqualTo("20-11111111-1");
      assertThat(foundCliente.get().getMaximoDescubierto()).isEqualTo(BigDecimal.valueOf(10000));
   }

   @Test
   void testFindByMaximoDescubierto() {
      Cliente cliente = new Cliente();
      cliente.setNombre("Nombre 1");
      cliente.setApellido("Apellido 1");
      cliente.setDni("11111111");
      cliente.setCantidad_obras(2);
      cliente.setCorreoElectronico("correo1@example.com");
      cliente.setCuit("20-11111111-1");
      cliente.setMaximoDescubierto(BigDecimal.valueOf(10000));
      clienteRepository.save(cliente);

      List<Cliente> resultado = clienteRepository.findByMaximoDescubiertoGreaterThanEqual(BigDecimal.valueOf(5000));
      log.info("ENCONTRE: {} ", resultado);
      assertThat(resultado.size()).isEqualTo(2);
      assertThat(resultado.get(0).getMaximoDescubierto()).isGreaterThanOrEqualTo(BigDecimal.valueOf(5000));
      assertThat(resultado.get(1).getMaximoDescubierto()).isGreaterThanOrEqualTo(BigDecimal.valueOf(5000));
   }
}
