import {Usuario} from './usuario';

export class Incidente {
  constructor(
    public cliente: Usuario,
    public comentarios: string,
    public correo: string,
    public descripcion: string,
    public direccion: string,
    public estado: string,
    public fechacreacion: string,
    public id: number,
    public prioridad: string,
    public telefono: string,
    public usuario: Usuario,
    public canal: string,
    public tipo: string,
    public gestor: Usuario
  ) {}
}

export class NewUpdatedIncidencia {
  constructor(
    public cliente: string,
    public usuario: string,
    public gestor: string,
    public correo: string,
    public direccion: string,
    public telefono: string,
    public descripcion: string,
    public prioridad: string,
    public estado: string,
    public comentarios: string,
    public canal: string,
    public tipo: string
  ) {}
}
