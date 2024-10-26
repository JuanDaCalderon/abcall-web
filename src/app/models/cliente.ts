export class Cliente {
  constructor(
    public id: number,
    public nombres: string,
    public apellidos: string,
    public email: string,
    public telefono: string,
    public direccion: string,
    public username: string,
    public password: string,
    public rol: number,
    public gestortier: string
  ) {}
}
