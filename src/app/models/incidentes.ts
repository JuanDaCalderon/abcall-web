export class Incidente {
  constructor(
    public id: number,
    public titulo: string,
    public descripcion: string,
    public fecha: string,
    public cliente: string
  ) {}
}
