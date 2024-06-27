package isi.dan.msclientes.servicios;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import isi.dan.msclientes.dao.ClienteRepository;
import isi.dan.msclientes.dao.UsuarioHabilitadoRepository;
import isi.dan.msclientes.model.Cliente;
import isi.dan.msclientes.model.UsuarioHabilitado;
import jakarta.persistence.EntityNotFoundException;

@Service
public class UsuarioHabilitadoService {

   @Autowired
   private UsuarioHabilitadoRepository usuarioHabilitadoRepository;

   @Autowired
   private ClienteRepository clienteRepository;

   public UsuarioHabilitado save(UsuarioHabilitado usuarioHabilitado) {
      return usuarioHabilitadoRepository.save(usuarioHabilitado);
   }

   public List<UsuarioHabilitado> findAll() {
      return usuarioHabilitadoRepository.findAll();
   }

   public Optional<UsuarioHabilitado> findById(Integer id) {
      return usuarioHabilitadoRepository.findById(id);
   }

   public void deleteById(Integer id) {
      usuarioHabilitadoRepository.deleteById(id);
   }

   public UsuarioHabilitado update(UsuarioHabilitado usuarioHabilitado) {
      return usuarioHabilitadoRepository.save(usuarioHabilitado);
   }

   public Cliente updateClienteUsuariosHabilitados(Integer clienteId, List<UsuarioHabilitado> usuariosHabilitados) {
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
   }
}