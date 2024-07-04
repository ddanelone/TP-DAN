package isi.dan.msclientes.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "MS_CLI_OBRA")
@Builder
public class Obra {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Integer id;

   private String calle;
   private String ciudad;
   private String provincia;
   private String pais;
   private String altura;
   // private String direccion;

   @Column(name = "ES_REMODELACION")
   private Boolean esRemodelacion;

   private float lat;

   private float lng;

   @ManyToOne
   @JoinColumn(name = "ID_CLIENTE")
   private Cliente cliente;

   private BigDecimal presupuesto;

   private Estado estado;

}
