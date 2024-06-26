import { AuthorizedUser } from "./user-authorize.interface";

export interface Costumer {
  id?: number;
  nombre: string;
  apellido: string;
  dni: string;
  correoElectronico: string;
  cuit: string;
  maximoDescubierto: number;
  usuariosHabilitados?: AuthorizedUser[];
}
