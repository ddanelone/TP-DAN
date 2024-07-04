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

import isi.dan.msclientes.model.UsuarioHabilitado;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@Testcontainers
@ActiveProfiles("db")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UsuarioHabilitadoRepositoryTest {

   Logger log = LoggerFactory.getLogger(UsuarioHabilitadoRepositoryTest.class);

   @Container
   public static MySQLContainer<?> mysqlContainer = new MySQLContainer<>("mysql:8.0")
         .withDatabaseName("testdb")
         .withUsername("test")
         .withPassword("test");

   @Autowired
   private UsuarioHabilitadoRepository usuarioHabilitadoRepository;

   @DynamicPropertySource
   static void configureProperties(DynamicPropertyRegistry registry) {
      registry.add("spring.datasource.url", mysqlContainer::getJdbcUrl);
      registry.add("spring.datasource.username", mysqlContainer::getUsername);
      registry.add("spring.datasource.password", mysqlContainer::getPassword);
   }

   @BeforeEach
   void iniciarDatos() {
      UsuarioHabilitado usuario = new UsuarioHabilitado();
      usuario.setNombre("Nombre 2");
      usuario.setApellido("Apellido 2");
      usuario.setDni("22222222");
      usuario.setCorreoElectronico("correo2@example.com");
      usuarioHabilitadoRepository.save(usuario);
   }

   @BeforeEach
   void borrarDatos() {
      usuarioHabilitadoRepository.deleteAll();
   }

   @AfterAll
   static void stopContainer() {
      mysqlContainer.stop();
   }

   @Test
   void testSaveAndFindById() {
      UsuarioHabilitado usuario = new UsuarioHabilitado();
      usuario.setNombre("Nombre 1");
      usuario.setApellido("Apellido 1");
      usuario.setDni("11111111");
      usuario.setCorreoElectronico("correo1@example.com");
      usuarioHabilitadoRepository.save(usuario);

      Optional<UsuarioHabilitado> foundUsuario = usuarioHabilitadoRepository.findById(usuario.getId());
      log.info("ENCONTRE: {} ", foundUsuario);
      assertThat(foundUsuario).isPresent();
      assertThat(foundUsuario.get().getNombre()).isEqualTo("Nombre 1");
      assertThat(foundUsuario.get().getApellido()).isEqualTo("Apellido 1");
      assertThat(foundUsuario.get().getDni()).isEqualTo("11111111");
      assertThat(foundUsuario.get().getCorreoElectronico()).isEqualTo("correo1@example.com");
   }

   @Test
   void testFindByCorreoElectronico() {
      UsuarioHabilitado usuario = new UsuarioHabilitado();
      usuario.setNombre("Nombre 1");
      usuario.setApellido("Apellido 1");
      usuario.setDni("11111111");
      usuario.setCorreoElectronico("correo1@example.com");
      usuarioHabilitadoRepository.save(usuario);

      Optional<UsuarioHabilitado> foundUsuario = usuarioHabilitadoRepository
            .findByCorreoElectronico("correo1@example.com");
      log.info("ENCONTRE: {} ", foundUsuario);
      assertThat(foundUsuario).isPresent();
      assertThat(foundUsuario.get().getNombre()).isEqualTo("Nombre 1");
      assertThat(foundUsuario.get().getApellido()).isEqualTo("Apellido 1");
      assertThat(foundUsuario.get().getDni()).isEqualTo("11111111");
      assertThat(foundUsuario.get().getCorreoElectronico()).isEqualTo("correo1@example.com");
   }
}
