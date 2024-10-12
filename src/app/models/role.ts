import {Permiso} from './permiso';

export class Role {
  constructor(
    public ID: number,
    public NOMBRE: string,
    public PERMISOS: [Permiso]
  ) {}
}
