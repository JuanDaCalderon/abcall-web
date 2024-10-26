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
    public tipo: string
  ) {}
}
