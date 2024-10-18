export class Usuario {
  id: number;
  email: string;
  username: string;
  nombres: string;
  apellidos: string;
  token: string;

  constructor(id: number, email: string, username: string, nombres: string, apellidos: string, token: string) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.token = token;
  }
}
