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

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.micrometer.core.annotation.Counted;
import io.micrometer.core.annotation.Timed;

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
   @Timed(value = "clientes.getAll.time", description = "Time taken to get all clients")
   @Counted(value = "clientes.getAll.count", description = "Times getAll() method is called")
   public List<Cliente> getAll() {
      log.info("Fetching all clients");
      List<Cliente> clientes = clienteService.findAll();
      log.info("Fetched {} clients", clientes.size());
      return clientes;
   }

   @GetMapping("/{id}")
   @Timed(value = "clientes.getById.time", description = "Time taken to get a client by ID")
   @Counted(value = "clientes.getById.count", description = "Times getById() method is called")
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
   @Timed(value = "clientes.create.time", description = "Time taken to create a client")
   @Counted(value = "clientes.create.count", description = "Times create() method is called")
   public Cliente create(@RequestBody Cliente cliente) {
      log.info("Creating client: {}", cliente);
      messageSenderService.sendMessage(RabbitMQConfig.CREAR_USUARIO_QUEUE, cliente);
      Cliente savedClient = clienteService.save(cliente);
      log.info("Created client: {}", savedClient);
      return savedClient;
   }

   @PutMapping("/{id}")
   @Timed(value = "clientes.update.time", description = "Time taken to update a client")
   @Counted(value = "clientes.update.count", description = "Times update() method is called")
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
   @Timed(value = "clientes.delete.time", description = "Time taken to delete a client")
   @Counted(value = "clientes.delete.count", description = "Times delete() method is called")
   public ResponseEntity<Void> delete(@PathVariable Integer id) {
      log.info("Deleting client with id {}", id);
      if (!clienteService.findById(id).isPresent()) {
         log.warn("Client with id {} not found", id);
         return ResponseEntity.notFound().build();
      }
      clienteService.deleteById(id);
      log.info("Deleted client with id {}", id);
      return ResponseEntity.noContent().build();
   }

   @GetMapping("/email/{email}")
   @Timed(value = "clientes.getByEmail.time", description = "Time taken to get a client by email")
   @Counted(value = "clientes.getByEmail.count", description = "Times getByEmail() method is called")
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
   @Timed(value = "clientes.agregarUsuarioHabilitado.time", description = "Time taken to add an enabled user")
   @Counted(value = "clientes.agregarUsuarioHabilitado.count", description = "Times agregarUsuarioHabilitado() method is called")
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
   @Timed(value = "clientes.getUsuariosHabilitados.time", description = "Time taken to get enabled users")
   @Counted(value = "clientes.getUsuariosHabilitados.count", description = "Times getUsuariosHabilitados() method is called")
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
   @Timed(value = "clientes.eliminarUsuarioHabilitado.time", description = "Time taken to remove an enabled user")
   @Counted(value = "clientes.eliminarUsuarioHabilitado.count", description = "Times eliminarUsuarioHabilitado() method is called")
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
      clienteService.update(cliente);
      usuarioHabilitadoService.deleteById(usuarioHabilitadoId);
      log.info("Removed enabled user with id {} from client with id {}", usuarioHabilitadoId, clienteId);
      return ResponseEntity.noContent().build();
   }

   // Faltar agregarle los test de integración
   @GetMapping("/{id}/verificar-saldo")
   public boolean verificarSaldo(@PathVariable Integer id, @RequestParam("montoTotal") double montoTotal) {
      log.info("Verificando saldo para el cliente con id {}", id);
      Optional<Cliente> cliente = clienteService.findById(id);
      if (cliente.isPresent()) {
         return cliente.get().getMaximoDescubierto().doubleValue() >= BigDecimal.valueOf(montoTotal).doubleValue();

      }
      return false;
   }
}
