package isi.dan.msclientes.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "MS_CLI_USUARIO_HABILITADO")
@Data
public class UsuarioHabilitado {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer id;
   private String nombre;
   private String apellido;
   private String dni;
   @Column(name = "CORREO_ELECTRONICO", unique = true)
   private String correoElectronico;

   @ManyToOne
   @JoinColumn(name = "ID_CLIENTE")
   private Cliente cliente;
}
