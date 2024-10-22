import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Incidente} from '../models/incidentes';

@Injectable({
  providedIn: 'root'
})
export class CrearIncidenteService {
  /** API url */
  private apiUrl = environment.urlApi + environment.portCrearIncidentes;
  constructor(private http: HttpClient) {}

  /**
   * Create incident to the backend
   * @param {string} email Email of the user
   * @param {string} password Password of the user
   * @param {string} cliente
   * @param {string} fechacreacion
   * @param {string} usuario
   * @param {string} correo
   * @param {string} direccion
   * @param {string} telefono
   * @param {string} descripcion
   * @param {string} prioridad
   * @param {string} estado
   * @param {string} comentarios
   * @returns {Observable<string>}
   */
  public crearIncidente(
    cliente: string,
    fechacreacion: string,
    usuario: string,
    correo: string,
    direccion: string,
    telefono: string,
    descripcion: string,
    prioridad: string,
    estado: string,
    comentarios: string
  ): Observable<Incidente> {
    return this.http.post<Incidente>(`${this.apiUrl}/incidentes`, {
      cliente,
      fechacreacion,
      usuario,
      correo,
      direccion,
      telefono,
      descripcion,
      prioridad,
      estado,
      comentarios
    });
  }
}
