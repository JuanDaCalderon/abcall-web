import {Role} from './role';

export class Usuario {
  id: string;
  email: string;
  username: string;
  password: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  gestortier: string;
  token: string;
  rol: Role;

  constructor(
    id: string,
    email: string,
    username: string,
    password: string,
    nombres: string,
    apellidos: string,
    telefono: string,
    direccion: string,
    gestortier: string,
    token: string,
    rol: Role
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.telefono = telefono;
    this.direccion = direccion;
    this.gestortier = gestortier;
    this.token = token;
    this.rol = rol;
  }
}
