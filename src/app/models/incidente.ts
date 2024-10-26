export class Incidente {
  id: number;
  cliente: string;
  fechacreacion: string;
  usuario: string;
  correo: string;
  direccion: string;
  telefono: string;
  descripcion: string;
  prioridad: string;
  estado: string;
  comentarios: string;
  canal: string;
  tipo: string;

  constructor(
    id: number,
    cliente: string,
    fechacreacion: string,
    usuario: string,
    correo: string,
    direccion: string,
    telefono: string,
    descripcion: string,
    prioridad: string,
    estado: string,
    comentarios: string,
    canal: string,
    tipo: string
  ) {
    this.id = id;
    this.cliente = cliente;
    this.fechacreacion = fechacreacion;
    this.usuario = usuario;
    this.correo = correo;
    this.direccion = direccion;
    this.telefono = telefono;
    this.descripcion = descripcion;
    this.prioridad = prioridad;
    this.estado = estado;
    this.comentarios = comentarios;
    this.canal = canal;
    this.tipo = tipo;
  }
}
