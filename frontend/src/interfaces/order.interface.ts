import { Costumer } from "./costumer.interface";
import { OrderDetails } from "./order-detail.interface";
import { Status } from "./order-state-interface";

export interface Order {
  id?: string;
  fecha: Date;
  numeroPedido: number;
  usuario: string;
  observaciones: string;
  cliente: Costumer;
  total: number;
  estado: Status;

  detalle: OrderDetails[];
}
