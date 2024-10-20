import {Permiso} from './permiso';

export class Role {
  constructor(
    public id: number,
    public nombre: string,
    public permisos: Permiso[]
  ) {}
}
