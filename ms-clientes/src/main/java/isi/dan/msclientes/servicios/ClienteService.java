package isi.dan.msclientes.servicios;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.micrometer.observation.Observation;
import io.micrometer.observation.ObservationRegistry;
import isi.dan.msclientes.dao.ClienteRepository;
import isi.dan.msclientes.model.Cliente;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

   @Value("${cliente.maximo_descubierto.default}")
   private BigDecimal defaultMaximoDescubierto;

   @Autowired
   private ClienteRepository clienteRepository;

   @Autowired
   private ObservationRegistry observationRegistry;

   Logger log = LoggerFactory.getLogger(ClienteService.class);

   public List<Cliente> findAll() {
      return Observation.createNotStarted("cliente.findAll", observationRegistry)
            .observe(() -> clienteRepository.findAll());
   }

   public Optional<Cliente> findById(Integer id) {
      return Observation.createNotStarted("cliente.findById", observationRegistry)
            .observe(() -> clienteRepository.findById(id));
   }

   public Cliente save(Cliente cliente) {
      return Observation.createNotStarted("cliente.save", observationRegistry)
            .observe(() -> {
               if (cliente.getMaximoDescubierto() == null
                     || cliente.getMaximoDescubierto().compareTo(BigDecimal.ZERO) == 0) {
                  cliente.setMaximoDescubierto(defaultMaximoDescubierto);
               }
               return clienteRepository.save(cliente);
            });
   }

   public Cliente update(Cliente cliente) {
      return Observation.createNotStarted("cliente.update", observationRegistry)
            .observe(() -> clienteRepository.save(cliente));
   }

   public void deleteById(Integer id) {
      Observation.createNotStarted("cliente.deleteById", observationRegistry)
            .observe(() -> {
               clienteRepository.deleteById(id);
               return null;
            });
   }

   public Optional<Cliente> findByCorreoElectronico(String correoElectronico) {
      return Observation.createNotStarted("cliente.findByCorreoElectronico", observationRegistry)
            .observe(() -> clienteRepository.findByCorreoElectronico(correoElectronico));
   }
}