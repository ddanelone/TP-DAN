package isi.dan.msclientes.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import isi.dan.msclientes.model.Estado;
import isi.dan.msclientes.model.Obra;
import isi.dan.msclientes.servicios.GeocodingService;
import isi.dan.msclientes.servicios.ObraService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import io.micrometer.core.annotation.Counted;
import io.micrometer.core.annotation.Timed;

@RestController
@RequestMapping("/api/obras")
public class ObraController {

   @Autowired
   private ObraService obraService;

   @Autowired
   private GeocodingService geocodingService;

   @Value("${obras.cantidad_maxima_habilitadas}")
   private int cantidadMaximaObrasHabilitadas;

   private static final Logger log = LoggerFactory.getLogger(ObraController.class);

   @Timed(value = "obra.getAll.time", description = "Time taken to return all obras")
   @Counted(value = "obra.getAll.count", description = "Times all obras are requested")
   @GetMapping
   public List<Obra> getAll() {
      log.info("Fetching all obras");
      return obraService.findAll();
   }

   @Timed(value = "obra.getEstado.time", description = "Time taken to return all estados")
   @Counted(value = "obra.getEstado.count", description = "Times all estados are requested")
   @GetMapping("/estados")
   public List<Estado> getEstado() {
      log.info("Fetching all estados");
      return obraService.findStates();
   }

   @Timed(value = "obra.getById.time", description = "Time taken to return an obra by ID")
   @Counted(value = "obra.getById.count", description = "Times an obra is requested by ID")
   @GetMapping("/{id}")
   public ResponseEntity<Obra> getById(@PathVariable Integer id) {
      log.info("Fetching obra with id: {}", id);
      Optional<Obra> obra = obraService.findById(id);
      return obra.map(ResponseEntity::ok).orElseGet(() -> {
         log.warn("Obra not found with id: {}", id);
         return ResponseEntity.notFound().build();
      });
   }

   @Timed(value = "obra.create.time", description = "Time taken to create a new obra")
   @Counted(value = "obra.create.count", description = "Times a new obra is created")
   @PostMapping
   public Obra create(@RequestBody Obra obra) {
      log.info("Creating new obra: {}", obra);
      return obraService.save(obra);
   }

   @Timed(value = "obra.update.time", description = "Time taken to update an obra")
   @Counted(value = "obra.update.count", description = "Times an obra is updated")
   @PutMapping("/{id}")
   public ResponseEntity<Obra> update(@PathVariable Integer id, @RequestBody Obra obra) {
      log.info("Updating obra with id: {}", id);
      if (!obraService.findById(id).isPresent()) {
         log.warn("Obra not found with id: {}", id);
         return ResponseEntity.notFound().build();
      }
      obra.setId(id);
      return ResponseEntity.ok(obraService.update(obra));
   }

   @Timed(value = "obra.delete.time", description = "Time taken to delete an obra")
   @Counted(value = "obra.delete.count", description = "Times an obra is deleted")
   @DeleteMapping("/{id}")
   public ResponseEntity<Void> delete(@PathVariable Integer id) {
      log.info("Deleting obra with id: {}", id);
      if (!obraService.findById(id).isPresent()) {
         log.warn("Obra not found with id: {}", id);
         return ResponseEntity.notFound().build();
      }
      obraService.deleteById(id);
      return ResponseEntity.noContent().build();
   }

   @Timed(value = "obra.getCoordinates.time", description = "Time taken to get coordinates for an address")
   @Counted(value = "obra.getCoordinates.count", description = "Times coordinates are requested for an address")
   @PostMapping("/coordenadas")
   public ResponseEntity<Map<String, Double>> getCoordinates(@RequestBody Map<String, String> address) {
      String calle = address.get("calle");
      String altura = address.get("altura");
      String ciudad = address.get("ciudad");
      String provincia = address.get("provincia");
      String pais = address.get("pais");

      log.info("Fetching coordinates for address: {}, {}, {}, {}, {}", calle, altura, ciudad, provincia, pais);

      try {
         Map<String, Double> coordinates = geocodingService.getCoordinates(calle, altura, ciudad, provincia, pais);
         return ResponseEntity.ok(coordinates);
      } catch (Exception e) {
         log.error("Error fetching coordinates for address: {}, {}, {}, {}, {}", calle, altura, ciudad, provincia, pais,
               e);
         return ResponseEntity.status(500).body(null);
      }
   }

   @Timed(value = "obra.validarObra.time", description = "Time taken to validate an obra for a cliente")
   @Counted(value = "obra.validarObra.count", description = "Times an obra is validated for a cliente")
   @PostMapping("/cliente/validar-obra/{idCliente}")
   public ResponseEntity<Map<String, Object>> validarObra(@PathVariable Integer idCliente, @RequestBody Obra obra) {
      log.info("Validating obra for cliente with id: {}", idCliente);
      return obraService.validarObra(idCliente, obra, cantidadMaximaObrasHabilitadas);
   }
}
