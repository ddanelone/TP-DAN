package isi.dan.msclientes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import isi.dan.msclientes.dao.UsuarioHabilitadoRepository;
import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.model.UsuarioHabilitado;
import isi.dan.msclientes.servicios.ClienteService;
import isi.dan.msclientes.servicios.UsuarioHabilitadoService;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

   @Autowired
   private ClienteService clienteService;

   @Autowired
   private UsuarioHabilitadoService usuarioHabilitadoService;

   @GetMapping
   public List<Cliente> getAll() {
      return clienteService.findAll();
   }

   @GetMapping("/{id}")
   public ResponseEntity<Cliente> getById(@PathVariable Integer id) {
      Optional<Cliente> cliente = clienteService.findById(id);
      return cliente.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
   }

   @PostMapping
   public Cliente create(@RequestBody Cliente cliente) {
      return clienteService.save(cliente);
   }

   @PutMapping("/{id}")
   public ResponseEntity<Cliente> update(@PathVariable final Integer id, @RequestBody Cliente cliente) {
      if (!clienteService.findById(id).isPresent()) {
         return ResponseEntity.notFound().build();
      }
      cliente.setId(id);
      return ResponseEntity.ok(clienteService.update(cliente));
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<Void> delete(@PathVariable Integer id) {
      if (!clienteService.findById(id).isPresent()) {
         return ResponseEntity.notFound().build();
      }
      clienteService.deleteById(id);
      return ResponseEntity.noContent().build();
   }

   @PostMapping("/{clienteId}/usuarios-habilitados")
   public ResponseEntity<UsuarioHabilitado> agregarUsuarioHabilitado(
         @PathVariable Integer clienteId, @RequestBody UsuarioHabilitado usuarioHabilitado) {
      Optional<Cliente> clienteOpt = clienteService.findById(clienteId);
      if (!clienteOpt.isPresent()) {
         return ResponseEntity.notFound().build();
      }

      Cliente cliente = clienteOpt.get();
      usuarioHabilitado.setCliente(cliente);
      usuarioHabilitadoService.save(usuarioHabilitado);

      return ResponseEntity.ok(usuarioHabilitado);
   }

   @GetMapping("/{clienteId}/usuarios-habilitados")
   public ResponseEntity<Set<UsuarioHabilitado>> getUsuariosHabilitados(@PathVariable Integer clienteId) {
      Optional<Cliente> clienteOpt = clienteService.findById(clienteId);
      if (!clienteOpt.isPresent()) {
         return ResponseEntity.notFound().build();
      }
      return ResponseEntity.ok(clienteOpt.get().getUsuariosHabilitados());
   }

   @DeleteMapping("/{clienteId}/usuarios-habilitados/{usuarioHabilitadoId}")
   public ResponseEntity<Void> eliminarUsuarioHabilitado(@PathVariable Integer clienteId,
         @PathVariable Integer usuarioHabilitadoId) {
      Optional<Cliente> clienteOpt = clienteService.findById(clienteId);
      if (!clienteOpt.isPresent()) {
         return ResponseEntity.notFound().build();
      }

      Cliente cliente = clienteOpt.get();
      Set<UsuarioHabilitado> usuariosHabilitados = cliente.getUsuariosHabilitados();
      UsuarioHabilitado usuarioHabilitado = usuariosHabilitados.stream()
            .filter(uh -> uh.getId().equals(usuarioHabilitadoId))
            .findFirst()
            .orElse(null);

      if (usuarioHabilitado == null) {
         return ResponseEntity.notFound().build();
      }

      usuariosHabilitados.remove(usuarioHabilitado);
      usuarioHabilitadoService.deleteById(usuarioHabilitadoId);

      return ResponseEntity.noContent().build();
   }
}
