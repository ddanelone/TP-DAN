package isi.dan.msclientes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import isi.dan.msclientes.conf.MessageSenderService;
import isi.dan.msclientes.conf.RabbitMQConfig;
import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.model.UsuarioHabilitado;
import isi.dan.msclientes.servicios.ClienteService;
import isi.dan.msclientes.servicios.UsuarioHabilitadoService;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

   @Autowired
   private ClienteService clienteService;

   @Autowired
   private UsuarioHabilitadoService usuarioHabilitadoService;

   @Autowired
   private MessageSenderService messageSenderService;

   private static final Logger log = LoggerFactory.getLogger(ClienteController.class);

   @GetMapping
   public List<Cliente> getAll() {
      log.info("Fetching all clients");
      List<Cliente> clientes = clienteService.findAll();
      log.info("Fetched {} clients", clientes.size());
      return clientes;
   }

   @GetMapping("/{id}")
   public ResponseEntity<Cliente> getById(@PathVariable Integer id) {
      log.info("Fetching client with id {}", id);
      Optional<Cliente> cliente = clienteService.findById(id);
      if (cliente.isPresent()) {
         log.info("Client found: {}", cliente.get());
         return ResponseEntity.ok(cliente.get());
      } else {
         log.warn("Client with id {} not found", id);
         return ResponseEntity.notFound().build();
      }
   }

   @PostMapping
   public Cliente create(@RequestBody Cliente cliente) {
      log.info("Creating client: {}", cliente);
      messageSenderService.sendMessage(RabbitMQConfig.CREAR_USUARIO_QUEUE, cliente);
      Cliente savedClient = clienteService.save(cliente);
      log.info("Created client: {}", savedClient);
      return savedClient;
   }

   @PutMapping("/{id}")
   public ResponseEntity<Cliente> update(@PathVariable final Integer id, @RequestBody Cliente cliente) {
      log.info("Updating client with id {}", id);
      if (!clienteService.findById(id).isPresent()) {
         log.warn("Client with id {} not found for update", id);
         return ResponseEntity.notFound().build();
      }
      cliente.setId(id);
      Cliente updatedClient = clienteService.update(cliente);
      log.info("Updated client: {}", updatedClient);
      return ResponseEntity.ok(updatedClient);
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<Void> delete(@PathVariable Integer id) {
      log.info("Deleting client with id {}", id);
      if (!clienteService.findById(id).isPresent()) {
         log.warn("Client with id {} not found for deletion", id);
         return ResponseEntity.notFound().build();
      }
      clienteService.deleteById(id);
      log.info("Deleted client with id {}", id);
      return ResponseEntity.noContent().build();
   }

   @GetMapping("/email/{email}")
   public ResponseEntity<Cliente> getByEmail(@PathVariable String email) {
      log.info("Fetching client with email {}", email);
      Optional<Cliente> cliente = clienteService.findByCorreoElectronico(email);
      if (cliente.isPresent()) {
         log.info("Client found: {}", cliente.get());
         return ResponseEntity.ok(cliente.get());
      } else {
         log.warn("Client with email {} not found", email);
         return ResponseEntity.notFound().build();
      }
   }

   @PostMapping("/{clienteId}/usuarios-habilitados")
   public ResponseEntity<UsuarioHabilitado> agregarUsuarioHabilitado(
         @PathVariable Integer clienteId, @RequestBody UsuarioHabilitado usuarioHabilitado) {
      log.info("Adding enabled user to client with id {}", clienteId);
      Optional<Cliente> clienteOpt = clienteService.findById(clienteId);
      if (!clienteOpt.isPresent()) {
         log.warn("Client with id {} not found", clienteId);
         return ResponseEntity.notFound().build();
      }

      Cliente cliente = clienteOpt.get();
      usuarioHabilitado.setCliente(cliente);
      UsuarioHabilitado savedUser = usuarioHabilitadoService.save(usuarioHabilitado);
      messageSenderService.sendMessage(RabbitMQConfig.CREAR_USUARIO_QUEUE, savedUser);
      log.info("Added enabled user: {} to client: {}", savedUser, cliente);
      return ResponseEntity.ok(savedUser);
   }

   @GetMapping("/{clienteId}/usuarios-habilitados")
   public ResponseEntity<Set<UsuarioHabilitado>> getUsuariosHabilitados(@PathVariable Integer clienteId) {
      log.info("Fetching enabled users for client with id {}", clienteId);
      Optional<Cliente> clienteOpt = clienteService.findById(clienteId);
      if (!clienteOpt.isPresent()) {
         log.warn("Client with id {} not found", clienteId);
         return ResponseEntity.notFound().build();
      }
      Set<UsuarioHabilitado> usuariosHabilitados = clienteOpt.get().getUsuariosHabilitados();
      log.info("Fetched {} enabled users for client with id {}", usuariosHabilitados.size(), clienteId);
      return ResponseEntity.ok(usuariosHabilitados);
   }

   @DeleteMapping("/{clienteId}/usuarios-habilitados/{usuarioHabilitadoId}")
   public ResponseEntity<Void> eliminarUsuarioHabilitado(@PathVariable Integer clienteId,
         @PathVariable Integer usuarioHabilitadoId) {
      log.info("Removing enabled user with id {} from client with id {}", usuarioHabilitadoId, clienteId);
      Optional<Cliente> clienteOpt = clienteService.findById(clienteId);
      if (!clienteOpt.isPresent()) {
         log.warn("Client with id {} not found", clienteId);
         return ResponseEntity.notFound().build();
      }

      Cliente cliente = clienteOpt.get();
      Set<UsuarioHabilitado> usuariosHabilitados = cliente.getUsuariosHabilitados();
      UsuarioHabilitado usuarioHabilitado = usuariosHabilitados.stream()
            .filter(uh -> uh.getId().equals(usuarioHabilitadoId))
            .findFirst()
            .orElse(null);

      if (usuarioHabilitado == null) {
         log.warn("Enabled user with id {} not found for client with id {}", usuarioHabilitadoId, clienteId);
         return ResponseEntity.notFound().build();
      }

      usuariosHabilitados.remove(usuarioHabilitado);
      usuarioHabilitadoService.deleteById(usuarioHabilitadoId);
      log.info("Removed enabled user with id {} from client with id {}", usuarioHabilitadoId, clienteId);
      return ResponseEntity.noContent().build();
   }
}