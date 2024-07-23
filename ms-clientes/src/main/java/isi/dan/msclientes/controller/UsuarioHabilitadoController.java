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

import isi.dan.msclientes.aspect.TokenValidation;
import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.model.UsuarioHabilitado;
import isi.dan.msclientes.servicios.UsuarioHabilitadoService;
import jakarta.persistence.EntityNotFoundException;

import io.micrometer.core.annotation.Counted;
import io.micrometer.core.annotation.Timed;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/api/clientes/usuarios-habilitados")
@Tag(name = "UsuarioHabilitadoController", description = "Permite gestionar los usuarios que cada cliente tiene habilitados para operar en su nombre")
public class UsuarioHabilitadoController {

   @Autowired
   private UsuarioHabilitadoService usuarioHabilitadoService;

   private static final Logger log = LoggerFactory.getLogger(UsuarioHabilitadoController.class);

   @GetMapping
   @Operation(summary = "Obtener todos los usuarios", description = "Permite obtener la lista de todos los usuarios")
   @ApiResponses(value = {
         @ApiResponse(responseCode = "200", description = "Usuarios obtenidos correctamente"),
         @ApiResponse(responseCode = "401", description = "No autorizado"),
         @ApiResponse(responseCode = "403", description = "Prohibido"),
         @ApiResponse(responseCode = "404", description = "No se encontraron usuarios")
   })
   @Timed(value = "getAllUsuariosHabilitados.time", description = "Time taken to return all usuarios habilitados")
   @Counted(value = "getAllUsuariosHabilitados.count", description = "Number of times the getAll method is called")
   @TokenValidation
   public List<UsuarioHabilitado> getAll() {
      log.info("Fetching all usuarios habilitados");
      return usuarioHabilitadoService.findAll();
   }

   @GetMapping("/{id}")
   @Operation(summary = "Obtener Usuario Habilitado por ID", description = "Permite obtener un Usuario Habilitado por su ID")
   @ApiResponses(value = {
         @ApiResponse(responseCode = "200", description = "Usuario obtenido correctamente"),
         @ApiResponse(responseCode = "401", description = "No autorizado"),
         @ApiResponse(responseCode = "403", description = "Prohibido"),
         @ApiResponse(responseCode = "404", description = "El ID no existe")
   })
   @Timed(value = "getUsuarioHabilitadoById.time", description = "Time taken to return a usuario habilitado by id")
   @Counted(value = "getUsuarioHabilitadoById.count", description = "Number of times the getById method is called")
   @TokenValidation
   public ResponseEntity<UsuarioHabilitado> getById(@PathVariable Integer id) {
      log.info("Fetching usuario habilitado with id: {}", id);
      Optional<UsuarioHabilitado> usuarioHabilitado = usuarioHabilitadoService.findById(id);
      return usuarioHabilitado.map(ResponseEntity::ok).orElseGet(() -> {
         log.warn("Usuario habilitado not found with id: {}", id);
         return ResponseEntity.notFound().build();
      });
   }

   @PostMapping
   @Operation(summary = "Crear un usuario habilitado", description = "Permite crear un nuevo Usuario Habilitado")
   @ApiResponses(value = {
         @ApiResponse(responseCode = "200", description = "Creado correctamente"),
         @ApiResponse(responseCode = "401", description = "No autorizado"),
         @ApiResponse(responseCode = "403", description = "Prohibido"),
         @ApiResponse(responseCode = "404", description = "Error en los datos proporcionados")
   })
   @Timed(value = "createUsuarioHabilitado.time", description = "Time taken to create a new usuario habilitado")
   @Counted(value = "createUsuarioHabilitado.count", description = "Number of times the create method is called")
   @TokenValidation
   public UsuarioHabilitado create(@RequestBody UsuarioHabilitado usuarioHabilitado) {
      log.info("Creating new usuario habilitado: {}", usuarioHabilitado);
      return usuarioHabilitadoService.save(usuarioHabilitado);
   }

   @PutMapping("/{id}")
   @Operation(summary = "Actualizar un Usuario Habilitado", description = "Permite actualizar los datos de un usuario")
   @ApiResponses(value = {
         @ApiResponse(responseCode = "200", description = "Actualizado correctamente"),
         @ApiResponse(responseCode = "401", description = "No autorizado"),
         @ApiResponse(responseCode = "403", description = "Prohibido"),
         @ApiResponse(responseCode = "404", description = "El ID no existe")
   })
   @Timed(value = "updateUsuarioHabilitado.time", description = "Time taken to update a usuario habilitado")
   @Counted(value = "updateUsuarioHabilitado.count", description = "Number of times the update method is called")
   @TokenValidation
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

   @PutMapping("/update-usuario-habilitado/{clienteId}")
   @Timed(value = "updateClienteUsuarioHabilitado.time", description = "Time taken to update a usuario habilitado for a cliente")
   @Counted(value = "updateClienteUsuarioHabilitado.count", description = "Number of times the updateClienteUsuarioHabilitado method is called")
   @Operation(summary = "Actualizar un usuario habilitado para un cliente", description = "Permite actualizar un usuario habilitado para un cliente dado")
   @ApiResponses(value = {
         @ApiResponse(responseCode = "200", description = "Usuario habilitado actualizado correctamente"),
         @ApiResponse(responseCode = "401", description = "No autorizado"),
         @ApiResponse(responseCode = "403", description = "Prohibido"),
         @ApiResponse(responseCode = "404", description = "Cliente no encontrado")
   })
   @TokenValidation
   public ResponseEntity<Cliente> updateClienteUsuarioHabilitado(
         @PathVariable Integer clienteId,
         @RequestBody UsuarioHabilitado usuarioHabilitado) {
      log.info("Updating usuario habilitado for cliente with id: {}", clienteId);
      log.info("Received usuarioHabilitado: {}", usuarioHabilitado);

      try {
         Cliente updatedCliente = usuarioHabilitadoService.updateClienteUsuarioHabilitado(clienteId, usuarioHabilitado);
         log.info("Usuario habilitado updated successfully for cliente with id: {}", clienteId);
         return ResponseEntity.ok(updatedCliente);
      } catch (EntityNotFoundException e) {
         log.warn("Cliente not found with id: {}", clienteId);
         return ResponseEntity.notFound().build();
      }
   }

   @DeleteMapping("/{id}")
   @Operation(summary = "Eliminar un usuario habilitado", description = "Permite eliminar un usuario habilitado por su ID")
   @ApiResponses(value = {
         @ApiResponse(responseCode = "204", description = "Eliminado correctamente"),
         @ApiResponse(responseCode = "401", description = "No autorizado"),
         @ApiResponse(responseCode = "403", description = "Prohibido"),
         @ApiResponse(responseCode = "404", description = "El ID no existe")
   })
   @Timed(value = "deleteUsuarioHabilitado.time", description = "Time taken to delete a usuario habilitado")
   @Counted(value = "deleteUsuarioHabilitado.count", description = "Number of times the delete method is called")
   @TokenValidation
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