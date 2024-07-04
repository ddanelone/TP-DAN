package isi.dan.msclientes.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Builder;
import lombok.ToString;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "MS_CLI_USUARIO_HABILITADO")
@Builder
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
   @ToString.Exclude
   @JsonBackReference
   @JoinColumn(name = "ID_CLIENTE")
   private Cliente cliente;

   @Override
   public int hashCode() {
      final int prime = 31;
      int result = 1;
      result = prime * result + ((id == null) ? 0 : id.hashCode());
      result = prime * result + ((nombre == null) ? 0 : nombre.hashCode());
      // No incluir el cliente en el hashCode para evitar la recursión infinita
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
      UsuarioHabilitado other = (UsuarioHabilitado) obj;
      if (id == null) {
         if (other.id != null)
            return false;
      } else if (!id.equals(other.id))
         return false;
      return true;
   }

}
