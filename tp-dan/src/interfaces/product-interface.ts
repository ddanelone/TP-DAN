import { Category } from "./product-category-interface";

export interface Product {
  id?: number;
  nombre: string;
  descripcion: string;
  stockActual: number;
  stockMinimo: number;
  precio: number;
  categoria: Category;
  descuento: number;
  //cantidad sólo es relevante para el carrito
  cantidad?: number;
}
