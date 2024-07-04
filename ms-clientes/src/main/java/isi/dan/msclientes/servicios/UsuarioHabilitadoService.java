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
      return Observation.createNotStarted("usuarioHabilitado.save", observationRegistry)
            .observe(() -> {
               Optional<UsuarioHabilitado> usuarioGuardado = usuarioHabilitadoRepository
                     .findByCorreoElectronico(usuarioHabilitado.getCorreoElectronico());
               if (usuarioGuardado.isPresent()) {
                  throw new ResourceNotFoundException(
                        "Usuario con ese correo electrónico ya existe");
               }
               UsuarioHabilitado savedUser = usuarioHabilitadoRepository.save(usuarioHabilitado);
               messageSenderService.sendMessage(RabbitMQConfig.CREAR_USUARIO_QUEUE, savedUser);
               return savedUser;
            });
   }

   public List<UsuarioHabilitado> findAll() {
      return Observation.createNotStarted("usuarioHabilitado.findAll", observationRegistry)
            .observe(() -> usuarioHabilitadoRepository.findAll());
   }

   public Optional<UsuarioHabilitado> findById(Integer id) {
      return Observation.createNotStarted("usuarioHabilitado.findById", observationRegistry)
            .observe(() -> usuarioHabilitadoRepository.findById(id));
   }

   public void deleteById(Integer id) {
      Observation.createNotStarted("usuarioHabilitado.deleteById", observationRegistry)
            .observe(() -> usuarioHabilitadoRepository.deleteById(id));
   }

   public UsuarioHabilitado update(UsuarioHabilitado usuarioHabilitado) {
      return Observation.createNotStarted("usuarioHabilitado.update", observationRegistry)
            .observe(() -> usuarioHabilitadoRepository.save(usuarioHabilitado));
   }

   public Cliente updateClienteUsuariosHabilitados(Integer clienteId, List<UsuarioHabilitado> usuariosHabilitados) {
      return Observation.createNotStarted("cliente.updateUsuariosHabilitados", observationRegistry)
            .observe(() -> {
               Optional<Cliente> clienteOptional = clienteRepository.findById(clienteId);
               if (!clienteOptional.isPresent()) {
                  throw new EntityNotFoundException("Cliente no encontrado");
               }

               Cliente cliente = clienteOptional.get();
               cliente.getUsuariosHabilitados().clear();
               for (UsuarioHabilitado usuario : usuariosHabilitados) {
                  usuario.setCliente(cliente);
                  cliente.addUsuarioHabilitado(usuario);
               }
               return clienteRepository.save(cliente);
            });
   }
}
