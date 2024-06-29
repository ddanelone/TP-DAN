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

@Service
public class ObraService {

   @Autowired
   private ObraRepository obraRepository;

   public List<Obra> findAll() {
      return obraRepository.findAll();
   }

   public Optional<Obra> findById(Integer id) {
      return obraRepository.findById(id);
   }

   public Obra save(Obra obra) {
      return obraRepository.save(obra);
   }

   public Obra update(Obra obra) {
      return obraRepository.save(obra);
   }

   public void deleteById(Integer id) {
      obraRepository.deleteById(id);
   }

   public List<Estado> findStates() {
      return Arrays.asList(Estado.values());
   }

   public ResponseEntity<Map<String, Object>> validarObra(Integer idCliente, Obra obra,
         int cantidadMaximaObrasHabilitadas) {
      List<Obra> obrasCliente = obraRepository.findByClienteId(idCliente);

      Map<String, Object> response = new HashMap<>();

      System.out.println("obrasCliente: **** " + idCliente + " **** " + obrasCliente.size());

      if (obra.getEstado() == Estado.HABILITADA) {
         long obrasHabilitadasCount = obrasCliente.stream().filter(o -> o.getEstado() == Estado.HABILITADA).count();
         if (obrasHabilitadasCount >= cantidadMaximaObrasHabilitadas) {
            response.put("status", 400);
            response.put("message", "Superó el máximo de obras habilitadas, actualmente: " + obrasHabilitadasCount);
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

      System.out.println("LLegó al final");

      response.put("status", 200);
      response.put("message", "Obra validada");
      return ResponseEntity.ok(response);
   }
}
