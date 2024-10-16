export class Incidente {
  id: number;
  descripcion: string;
  estado: string;
  fechacreacion: string;
  gestorabc: string;
  cliente: string;
  usuario: string;
  comentarios: string;
  prioridad: string;

  constructor(
    id: number,
    descripcion: string,
    estado: string,
    fechacreacion: string,
    gestorabc: string,
    cliente: string,
    usuario: string,
    comentarios: string,
    prioridad: string
  ) {
    this.id = id;
    this.descripcion = descripcion;
    this.estado = estado;
    this.fechacreacion = fechacreacion;
    this.gestorabc = gestorabc;
    this.cliente = cliente;
    this.usuario = usuario;
    this.comentarios = comentarios;
    this.prioridad = prioridad;
  }
}
