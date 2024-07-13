import { Product } from "./product-interface";

export interface OrderDetails {
  cantidad: number;
  producto: Product;
  precioUnitario: number;
  descuento: number;
  precioFinal: number;
}
