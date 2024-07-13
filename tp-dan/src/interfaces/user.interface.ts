export interface User {
  id?: number;
  name: string;
  surname: string;
  email: string;
  dni: string;
  password?: string;
  role: number;
}
