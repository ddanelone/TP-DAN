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

   @GetMapping
   public List<Obra> getAll() {
      log.info("Fetching all obras");
      return obraService.findAll();
   }

   @GetMapping("/estados")
   public List<Estado> getEstado() {
      log.info("Fetching all estados");
      return obraService.findStates();
   }

   @GetMapping("/{id}")
   public ResponseEntity<Obra> getById(@PathVariable Integer id) {
      log.info("Fetching obra with id: {}", id);
      Optional<Obra> obra = obraService.findById(id);
      return obra.map(ResponseEntity::ok).orElseGet(() -> {
         log.warn("Obra not found with id: {}", id);
         return ResponseEntity.notFound().build();
      });
   }

   @PostMapping
   public Obra create(@RequestBody Obra obra) {
      log.info("Creating new obra: {}", obra);
      return obraService.save(obra);
   }

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

   @PostMapping("/cliente/validar-obra/{idCliente}")
   public ResponseEntity<Map<String, Object>> validarObra(@PathVariable Integer idCliente, @RequestBody Obra obra) {
      log.info("Validating obra for cliente with id: {}", idCliente);
      return obraService.validarObra(idCliente, obra, cantidadMaximaObrasHabilitadas);
   }
}
