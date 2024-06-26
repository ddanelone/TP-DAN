package isi.dan.msclientes.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "MS_CLI_CLIENTE")
@Data
public class Cliente {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer id;
   private String nombre;
   private String apellido;

   @Column(name = "dni", unique = true)
   private String dni;

   @Column(name = "CORREO_ELECTRONICO", unique = true)
   private String correoElectronico;

   private String cuit;

   @Column(name = "MAXIMO_DESCUBIERTO")
   private BigDecimal maximoDescubierto;

   @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
   private List<UsuarioHabilitado> usuariosHabilitados = new ArrayList<>();

}
