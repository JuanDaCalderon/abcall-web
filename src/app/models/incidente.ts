export class Incidente {
  ID: number;
  CLIENTE: string;
  FECHACREACION: string;
  USUARIO: string;
  CORREO: string;
  DIRECCION: string;
  TELEFONO: string;
  DESCRIPCION: string;
  PRIORIDAD: string;
  ESTADO: string;
  COMENTARIOS: string;

  constructor(
    ID: number,
    CLIENTE: string,
    FECHACREACION: string,
    USUARIO: string,
    CORREO: string,
    DIRECCION: string,
    TELEFONO: string,
    DESCRIPCION: string,
    PRIORIDAD: string,
    ESTADO: string,
    COMENTARIOS: string
  ) {
    this.ID = ID;
    this.CLIENTE = CLIENTE;
    this.FECHACREACION = FECHACREACION;
    this.USUARIO = USUARIO;
    this.CORREO = CORREO;
    this.DIRECCION = DIRECCION;
    this.TELEFONO = TELEFONO;
    this.DESCRIPCION = DESCRIPCION;
    this.PRIORIDAD = PRIORIDAD;
    this.ESTADO = ESTADO;
    this.COMENTARIOS = COMENTARIOS;
  }
}
