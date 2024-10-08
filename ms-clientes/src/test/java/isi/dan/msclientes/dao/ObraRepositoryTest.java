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
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import io.micrometer.core.instrument.MeterRegistry;
import isi.dan.msclientes.model.Obra;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@Testcontainers
@ActiveProfiles("db")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ObraRepositoryTest {

   Logger log = LoggerFactory.getLogger(ObraRepositoryTest.class);

   @MockBean
   private MeterRegistry meterRegistry;

   @Container
   public static MySQLContainer<?> mysqlContainer = new MySQLContainer<>("mysql:8.0")
         .withDatabaseName("testdb")
         .withUsername("test")
         .withPassword("test");

   @Autowired
   private ObraRepository obraRepository;

   @DynamicPropertySource
   static void configureProperties(DynamicPropertyRegistry registry) {
      registry.add("spring.datasource.url", mysqlContainer::getJdbcUrl);
      registry.add("spring.datasource.username", mysqlContainer::getUsername);
      registry.add("spring.datasource.password", mysqlContainer::getPassword);
   }

   @BeforeEach
   void iniciarDatos() {
      Obra obra = new Obra();
      obra.setCalle("calle 2");
      obra.setCiudad("ciudad 2");
      obra.setAltura("2222");
      obra.setProvincia("provincia 2");
      obra.setPais("pais 2");
      obra.setPresupuesto(BigDecimal.valueOf(100));
      obraRepository.save(obra);
   }

   @BeforeEach
   void borrarDatos() {
      obraRepository.deleteAll();
   }

   @AfterAll
   static void stopContainer() {
      mysqlContainer.stop();
   }

   @Test
   void testSaveAndFindById() {
      Obra obra = new Obra();
      obra.setCalle("calle 1");
      obra.setCiudad("ciudad 1");
      obra.setAltura("1111");
      obra.setProvincia("provincia 1");
      obra.setPais("pais 1");
      obraRepository.save(obra);

      Optional<Obra> foundObra = obraRepository.findById(obra.getId());
      log.info("ENCONTRE: {} ", foundObra);
      assertThat(foundObra).isPresent();
      assertThat(foundObra.get().getCalle()).isEqualTo("calle 1");
      assertThat(foundObra.get().getCiudad()).isEqualTo("ciudad 1");
      assertThat(foundObra.get().getAltura()).isEqualTo("1111");
      assertThat(foundObra.get().getProvincia()).isEqualTo("provincia 1");
      assertThat(foundObra.get().getPais()).isEqualTo("pais 1");
   }

   @Test
   void testFindByPresupuesto() {
      Obra obra = new Obra();
      obra.setCalle("calle 1");
      obra.setCiudad("ciudad 1");
      obra.setAltura("1111");
      obra.setProvincia("provincia 1");
      obra.setPais("pais 1");
      obra.setPresupuesto(BigDecimal.valueOf(200));
      obraRepository.save(obra);

      List<Obra> resultado = obraRepository.findByPresupuestoGreaterThanEqual(BigDecimal.valueOf(50));
      log.info("ENCONTRE: {} ", resultado);
      assertThat(resultado.size()).isEqualTo(2);
      assertThat(resultado.get(0).getPresupuesto()).isGreaterThan(BigDecimal.valueOf(50));
      assertThat(resultado.get(1).getPresupuesto()).isGreaterThan(BigDecimal.valueOf(50));
   }

}
