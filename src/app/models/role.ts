import {Permiso} from './permiso';

/* istanbul ignore next */
export class Role {
  constructor(
    public id: number,
    public nombre: string,
    public permisos: Permiso[]
  ) {}
}
