package isi.dan.msclientes.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import isi.dan.msclientes.model.UsuarioHabilitado;

public interface UsuarioHabilitadoRepository extends JpaRepository<UsuarioHabilitado, Integer> {

   Optional<UsuarioHabilitado> findByCorreoElectronico(String correoElectronico);

}
