package isi.dan.ms_productos.modelo;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "MS_PRD_PRODUCTO")
@Data
public class Producto {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;
   private String nombre;
   private String descripcion;
   @Column(name = "STOCK_ACTUAL")
   private int stockActual;
   @Column(name = "STOCK_MINIMO")
   private int stockMinimo;
   private BigDecimal precio;
   private BigDecimal descuento;

   @Enumerated(EnumType.STRING)
   private Categoria categoria;

}
