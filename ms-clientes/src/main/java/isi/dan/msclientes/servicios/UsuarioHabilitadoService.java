package isi.dan.msclientes.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import isi.dan.msclientes.conf.MessageSenderService;
import isi.dan.msclientes.conf.RabbitMQConfig;
import isi.dan.msclientes.dao.ClienteRepository;
import isi.dan.msclientes.dao.UsuarioHabilitadoRepository;
import isi.dan.msclientes.excepcion.ResourceNotFoundException;
import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.model.UsuarioHabilitado;
import jakarta.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.micrometer.observation.Observation;
import io.micrometer.observation.ObservationRegistry;

@Service
public class UsuarioHabilitadoService {

   @Autowired
   private UsuarioHabilitadoRepository usuarioHabilitadoRepository;

   @Autowired
   private ClienteRepository clienteRepository;

   @Autowired
   private MessageSenderService messageSenderService;

   @Autowired
   private ObservationRegistry observationRegistry;

   private Logger log = LoggerFactory.getLogger(UsuarioHabilitadoService.class);

   public UsuarioHabilitado save(UsuarioHabilitado usuarioHabilitado) {
      log.info("Saving new usuario habilitado: {}", usuarioHabilitado);
      return Observation.createNotStarted("usuarioHabilitado.save", observationRegistry)
            .observe(() -> {
               Optional<UsuarioHabilitado> usuarioGuardado = usuarioHabilitadoRepository
                     .findByCorreoElectronico(usuarioHabilitado.getCorreoElectronico());
               if (usuarioGuardado.isPresent()) {
                  log.warn("Usuario con correo electrónico {} ya existe", usuarioHabilitado.getCorreoElectronico());
                  throw new ResourceNotFoundException(
                        "Usuario con ese correo electrónico ya existe");
               }
               UsuarioHabilitado savedUser = usuarioHabilitadoRepository.save(usuarioHabilitado);
               log.info("Usuario habilitado saved: {}", savedUser);
               messageSenderService.sendMessage(RabbitMQConfig.CREAR_USUARIO_QUEUE, savedUser);
               log.info("Message sent to queue: {}", RabbitMQConfig.CREAR_USUARIO_QUEUE);
               return savedUser;
            });
   }

   public List<UsuarioHabilitado> findAll() {
      log.info("Finding all usuarios habilitados");
      return Observation.createNotStarted("usuarioHabilitado.findAll", observationRegistry)
            .observe(() -> {
               List<UsuarioHabilitado> usuarios = usuarioHabilitadoRepository.findAll();
               log.info("Found {} usuarios habilitados", usuarios.size());
               return usuarios;
            });
   }

   public Optional<UsuarioHabilitado> findById(Integer id) {
      log.info("Finding usuario habilitado by id: {}", id);
      return Observation.createNotStarted("usuarioHabilitado.findById", observationRegistry)
            .observe(() -> {
               Optional<UsuarioHabilitado> usuario = usuarioHabilitadoRepository.findById(id);
               if (usuario.isPresent()) {
                  log.info("Found usuario habilitado: {}", usuario.get());
               } else {
                  log.warn("Usuario habilitado with id {} not found", id);
               }
               return usuario;
            });
   }

   public void deleteById(Integer id) {
      log.info("Deleting usuario habilitado by id: {}", id);
      Observation.createNotStarted("usuarioHabilitado.deleteById", observationRegistry)
            .observe(() -> {
               usuarioHabilitadoRepository.deleteById(id);
               log.info("Usuario habilitado with id {} deleted", id);
            });
   }

   public UsuarioHabilitado update(UsuarioHabilitado usuarioHabilitado) {
      log.info("Updating usuario habilitado: {}", usuarioHabilitado);
      return Observation.createNotStarted("usuarioHabilitado.update", observationRegistry)
            .observe(() -> {
               UsuarioHabilitado updatedUser = usuarioHabilitadoRepository.save(usuarioHabilitado);
               log.info("Usuario habilitado updated: {}", updatedUser);
               return updatedUser;
            });
   }

   public Cliente updateClienteUsuarioHabilitado(Integer clienteId, UsuarioHabilitado usuarioHabilitado) {
      log.info("Updating usuario habilitado for cliente with id: {}", clienteId);
      log.info("Received usuario habilitado: {}", usuarioHabilitado);
      return Observation.createNotStarted("cliente.updateUsuariosHabilitados", observationRegistry)
            .observe(() -> {
               Cliente cliente = clienteRepository.findById(clienteId)
                     .orElseThrow(() -> {
                        log.warn("Cliente not found with id: {}", clienteId);
                        return new EntityNotFoundException("Cliente not found with id: " + clienteId);
                     });

               usuarioHabilitado.setCliente(cliente);

               // Actualizar o añadir el usuario habilitado
               boolean found = false;
               for (UsuarioHabilitado uh : cliente.getUsuariosHabilitados()) {
                  if (uh.getId().equals(usuarioHabilitado.getId())) {
                     log.info("Found existing usuario habilitado: {}", uh);
                     uh.setNombre(usuarioHabilitado.getNombre());
                     uh.setApellido(usuarioHabilitado.getApellido());
                     uh.setDni(usuarioHabilitado.getDni());
                     uh.setCorreoElectronico(usuarioHabilitado.getCorreoElectronico());
                     found = true;
                     break;
                  }
               }

               if (!found) {
                  log.info("Adding new usuario habilitado: {}", usuarioHabilitado);
                  cliente.addUsuarioHabilitado(usuarioHabilitado);
               }

               clienteRepository.save(cliente);
               log.info("Cliente updated with usuario habilitado: {}", cliente);
               return cliente;
            });
   }
}