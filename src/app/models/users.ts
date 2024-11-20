export enum ROLES {
  superadministrador = 1,
  administrador = 2,
  gestor = 3,
  cliente = 4,
  usuario = 5
}

export enum ROLES_NAME {
  superadministrador = 'superadministrador',
  administrador = 'administrador',
  gestor = 'gestor',
  cliente = 'cliente',
  usuario = 'usuario'
}

export enum GESTORTIERS {
  junior = 'junior',
  mid = 'mid',
  senior = 'senior',
  lead = 'lead',
  manager = 'manager'
}

export interface Permisos {
  id: number;
  nombre: string;
}

export interface Roles extends Permisos {
  permisos: Permisos[];
}

export interface Usuarios {
  id?: string;
  email: string;
  username: string;
  telefono: string;
  password?: string;
  nombres: string;
  apellidos: string;
  direccion?: string;
  fechacreacion?: string;
  token?: string;
  rol: Roles | ROLES;
}

export interface Gestores extends Usuarios {
  gestortier: GESTORTIERS;
}
