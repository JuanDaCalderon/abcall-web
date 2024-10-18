import {Role} from './role';

export class Usuario {
  id: number;
  email: string;
  username: string;
  nombres: string;
  apellidos: string;
  token: string;
  rol: Role;

  constructor(id: number, email: string, username: string, nombres: string, apellidos: string, token: string, rol: Role) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.token = token;
    this.rol = rol;
  }
}
