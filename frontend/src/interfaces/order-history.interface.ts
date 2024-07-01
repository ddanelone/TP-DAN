import { Status } from "./order-state-interface";

export interface OrderHistory {
  estado: Status;
  fechaCambio?: Date;
  usuarioCambio: String;
}
