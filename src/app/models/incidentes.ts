import {Usuario} from './usuario';

/* istanbul ignore next */
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

export interface IncidenteSerie {
  name: string;
  data: number[];
}

export enum CANALES {
  web = 'web',
  email = 'email',
  mobile = 'mobile'
}
export enum TIPOS {
  pqrs = 'pqrs',
  incidente = 'incidente'
}
export enum ESTADOS {
  abierto = 'abierto',
  'en progreso' = 'en progreso',
  cerrado = 'cerrado'
}
export enum PRIORIDADES {
  baja = 'baja',
  media = 'media',
  alta = 'alta'
}

export const canales: CANALES[] = [CANALES.web, CANALES.email, CANALES.mobile];
export const tipos: TIPOS[] = [TIPOS.pqrs, TIPOS.incidente];
export const estados: ESTADOS[] = [ESTADOS.abierto, ESTADOS['en progreso'], ESTADOS.cerrado];
export const prioridades: PRIORIDADES[] = [PRIORIDADES.baja, PRIORIDADES.media, PRIORIDADES.alta];
export const meses: string[] = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Novimebre',
  'Diciembre'
];
