package isi.dan.msclientes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;

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

   @GetMapping
   public List<Obra> getAll() {
      return obraService.findAll();
   }

   @GetMapping("/estados")
   public List<Estado> getEstado() {
      return obraService.findStates();
   }

   @GetMapping("/{id}")
   public ResponseEntity<Obra> getById(@PathVariable Integer id) {
      Optional<Obra> obra = obraService.findById(id);
      return obra.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
   }

   @PostMapping
   public Obra create(@RequestBody Obra obra) {
      return obraService.save(obra);
   }

   @PutMapping("/{id}")
   public ResponseEntity<Obra> update(@PathVariable Integer id, @RequestBody Obra obra) {
      if (!obraService.findById(id).isPresent()) {
         return ResponseEntity.notFound().build();
      }
      obra.setId(id);
      return ResponseEntity.ok(obraService.update(obra));
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<Void> delete(@PathVariable Integer id) {
      if (!obraService.findById(id).isPresent()) {
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

      // Convertir el mapa a JSON y imprimirlo en la consola
      try {
         ObjectMapper objectMapper = new ObjectMapper();
         String json = objectMapper.writeValueAsString(address);
         System.out.println("Dirección recibida: " + json);
      } catch (Exception e) {
         e.printStackTrace();
      }

      try {
         Map<String, Double> coordinates = geocodingService.getCoordinates(calle, altura, ciudad, provincia, pais);

         return ResponseEntity.ok(coordinates);
      } catch (Exception e) {
         return ResponseEntity.status(500).body(null);
      }
   }

   @PostMapping("/cliente/validar-obra/{idCliente}")
   public ResponseEntity<Map<String, Object>> validarObra(@PathVariable Integer idCliente, @RequestBody Obra obra) {
      return obraService.validarObra(idCliente, obra, cantidadMaximaObrasHabilitadas);
   }
}
