import { Costumer } from "./costumer.interface";
import { Estados } from "./estado-enum.interface";

export interface Building {
  id?: number;
  calle: string;
  altura: string;
  ciudad: string;
  provincia: string;
  pais: string;
  esRemodelacion: boolean;
  estado: Estados;
  lat: number;
  lng: number;
  presupuesto: number;
  cliente?: Costumer;
}
