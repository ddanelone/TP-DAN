package isi.dan.msclientes.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import isi.dan.msclientes.dao.ObraRepository;
import isi.dan.msclientes.model.Estado;
import isi.dan.msclientes.model.Obra;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import io.micrometer.observation.Observation;
import io.micrometer.observation.ObservationRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ObraService {

   @Autowired
   private ObraRepository obraRepository;

   @Autowired
   private ObservationRegistry observationRegistry;

   Logger log = LoggerFactory.getLogger(ObraService.class);

   public List<Obra> findAll() {
      return Observation.createNotStarted("obra.findAll", observationRegistry)
            .observe(() -> obraRepository.findAll());
   }

   public Optional<Obra> findById(Integer id) {
      return Observation.createNotStarted("obra.findById", observationRegistry)
            .observe(() -> obraRepository.findById(id));
   }

   public Obra save(Obra obra) {
      return Observation.createNotStarted("obra.save", observationRegistry)
            .observe(() -> obraRepository.save(obra));
   }

   public Obra update(Obra obra) {
      return Observation.createNotStarted("obra.update", observationRegistry)
            .observe(() -> obraRepository.save(obra));
   }

   public void deleteById(Integer id) {
      Observation.createNotStarted("obra.deleteById", observationRegistry)
            .observe(() -> obraRepository.deleteById(id));
   }

   public List<Estado> findStates() {
      return Observation.createNotStarted("obra.findStates", observationRegistry)
            .observe(() -> Arrays.asList(Estado.values()));
   }

   public ResponseEntity<Map<String, Object>> validarObra(Integer idCliente, Obra obra,
         int cantidadMaximaObrasHabilitadas) {
      return Observation.createNotStarted("obra.validarObra", observationRegistry)
            .observe(() -> {
               List<Obra> obrasCliente = obraRepository.findByClienteId(idCliente);
               Map<String, Object> response = new HashMap<>();

               if (obra.getEstado() == Estado.HABILITADA) {
                  long obrasHabilitadasCount = obrasCliente.stream().filter(o -> o.getEstado() == Estado.HABILITADA)
                        .count();
                  if (obrasHabilitadasCount >= cantidadMaximaObrasHabilitadas) {
                     response.put("status", 400);
                     response.put("message",
                           "Superó el máximo de obras habilitadas, actualmente: " + obrasHabilitadasCount);
                     return ResponseEntity.badRequest().body(response);
                  }
               }

               if (obra.getEstado() == Estado.FINALIZADA) {
                  Optional<Obra> obraPendiente = obrasCliente.stream().filter(o -> o.getEstado() == Estado.PENDIENTE)
                        .findFirst();
                  if (obraPendiente.isPresent()) {
                     Obra obraParaHabilitar = obraPendiente.get();
                     obraParaHabilitar.setEstado(Estado.HABILITADA);
                     obraRepository.save(obraParaHabilitar);
                     response.put("status", 200);
                     response.put("message", obraParaHabilitar);
                     return ResponseEntity.ok(response);
                  }
               }

               if (obra.getEstado() == Estado.PENDIENTE) {
                  response.put("status", 200);
                  response.put("message", "Obra pendiente validada");
                  return ResponseEntity.ok(response);
               }

               response.put("status", 200);
               response.put("message", "Obra validada");
               return ResponseEntity.ok(response);
            });
   }
}
