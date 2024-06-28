package isi.dan.msclientes.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

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

   @Column(name = "CANTIDAD_OBRAS")
   private Integer cantidad_obras;

   @Column(name = "CORREO_ELECTRONICO", unique = true)
   private String correoElectronico;

   private String cuit;

   @Column(name = "MAXIMO_DESCUBIERTO")
   private BigDecimal maximoDescubierto;

   @OneToMany(mappedBy = "cliente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
   @JsonManagedReference
   private Set<UsuarioHabilitado> usuariosHabilitados = new HashSet<>();

   public void addUsuarioHabilitado(UsuarioHabilitado usuarioHabilitado) {
      usuarioHabilitado.setCliente(this);
      this.usuariosHabilitados.add(usuarioHabilitado);
   }

   public void removeUsuarioHabilitado(UsuarioHabilitado usuarioHabilitado) {
      usuarioHabilitado.setCliente(null);
      this.usuariosHabilitados.remove(usuarioHabilitado);
   }

   @Override
   public int hashCode() {
      final int prime = 31;
      int result = 1;
      result = prime * result + ((id == null) ? 0 : id.hashCode());
      result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
      // No incluir los usuarios habilitados en el hashCode para evitar la recursión
      // infinita
      return result;
   }

   @Override
   public boolean equals(Object obj) {
      if (this == obj)
         return true;
      if (obj == null)
         return false;
      if (getClass() != obj.getClass())
         return false;
      Cliente other = (Cliente) obj;
      if (id == null) {
         if (other.id != null)
            return false;
      } else if (!id.equals(other.id))
         return false;
      return true;
   }

}