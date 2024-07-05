package isi.dan.msclientes.controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.model.UsuarioHabilitado;
import isi.dan.msclientes.servicios.UsuarioHabilitadoService;
import jakarta.persistence.EntityNotFoundException;

import io.micrometer.core.annotation.Counted;
import io.micrometer.core.annotation.Timed;

@RestController
@RequestMapping("/api/clientes/usuarios-habilitados")
public class UsuarioHabilitadoController {

   @Autowired
   private UsuarioHabilitadoService usuarioHabilitadoService;

   private static final Logger log = LoggerFactory.getLogger(UsuarioHabilitadoController.class);

   @GetMapping
   @Timed(value = "getAllUsuariosHabilitados.time", description = "Time taken to return all usuarios habilitados")
   @Counted(value = "getAllUsuariosHabilitados.count", description = "Number of times the getAll method is called")
   public List<UsuarioHabilitado> getAll() {
      log.info("Fetching all usuarios habilitados");
      return usuarioHabilitadoService.findAll();
   }

   @GetMapping("/{id}")
   @Timed(value = "getUsuarioHabilitadoById.time", description = "Time taken to return a usuario habilitado by id")
   @Counted(value = "getUsuarioHabilitadoById.count", description = "Number of times the getById method is called")
   public ResponseEntity<UsuarioHabilitado> getById(@PathVariable Integer id) {
      log.info("Fetching usuario habilitado with id: {}", id);
      Optional<UsuarioHabilitado> usuarioHabilitado = usuarioHabilitadoService.findById(id);
      return usuarioHabilitado.map(ResponseEntity::ok).orElseGet(() -> {
         log.warn("Usuario habilitado not found with id: {}", id);
         return ResponseEntity.notFound().build();
      });
   }

   @PostMapping
   @Timed(value = "createUsuarioHabilitado.time", description = "Time taken to create a new usuario habilitado")
   @Counted(value = "createUsuarioHabilitado.count", description = "Number of times the create method is called")
   public UsuarioHabilitado create(@RequestBody UsuarioHabilitado usuarioHabilitado) {
      log.info("Creating new usuario habilitado: {}", usuarioHabilitado);
      return usuarioHabilitadoService.save(usuarioHabilitado);
   }

   @PutMapping("/{id}")
   @Timed(value = "updateUsuarioHabilitado.time", description = "Time taken to update a usuario habilitado")
   @Counted(value = "updateUsuarioHabilitado.count", description = "Number of times the update method is called")
   public ResponseEntity<UsuarioHabilitado> update(@PathVariable final Integer id,
         @RequestBody UsuarioHabilitado usuarioHabilitado) {
      log.info("Updating usuario habilitado with id: {}", id);
      if (!usuarioHabilitadoService.findById(id).isPresent()) {
         log.warn("Usuario habilitado not found with id: {}", id);
         return ResponseEntity.notFound().build();
      }
      usuarioHabilitado.setId(id);
      return ResponseEntity.ok(usuarioHabilitadoService.update(usuarioHabilitado));
   }

   @PutMapping("/update-usuarios-habilitados/{clienteId}")
   @Timed(value = "updateClienteUsuariosHabilitados.time", description = "Time taken to update usuarios habilitados for a cliente")
   @Counted(value = "updateClienteUsuariosHabilitados.count", description = "Number of times the updateClienteUsuariosHabilitados method is called")
   public ResponseEntity<Cliente> updateClienteUsuariosHabilitados(@PathVariable Integer clienteId,
         @RequestBody List<UsuarioHabilitado> usuariosHabilitados) {
      log.info("Updating usuarios habilitados for cliente with id: {}", clienteId);
      try {
         Cliente updatedCliente = usuarioHabilitadoService.updateClienteUsuariosHabilitados(clienteId,
               usuariosHabilitados);
         return ResponseEntity.ok(updatedCliente);
      } catch (EntityNotFoundException e) {
         log.warn("Cliente not found with id: {}", clienteId);
         return ResponseEntity.notFound().build();
      }
   }

   @DeleteMapping("/{id}")
   @Timed(value = "deleteUsuarioHabilitado.time", description = "Time taken to delete a usuario habilitado")
   @Counted(value = "deleteUsuarioHabilitado.count", description = "Number of times the delete method is called")
   public ResponseEntity<Void> delete(@PathVariable Integer id) {
      log.info("Deleting usuario habilitado with id: {}", id);
      if (!usuarioHabilitadoService.findById(id).isPresent()) {
         log.warn("Usuario habilitado not found with id: {}", id);
         return ResponseEntity.notFound().build();
      }
      usuarioHabilitadoService.deleteById(id);
      return ResponseEntity.noContent().build();
   }
}