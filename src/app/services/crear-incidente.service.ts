import {Injectable} from '@angular/core';
import {Incidente} from '../models/incidente';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrearIncidenteService {
  /** API url */
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  /**
   * Login the user to the backend
   * @param {string} email Email of the user
   * @param {string} password Password of the user
   * @returns {Observable<string>}
   */
  public crearIncidente(
    descripcion: string,
    estado: string,
    fechacreacion: string,
    gestorabc: string,
    cliente: string,
    usuario: string,
    comentarios: string,
    prioridad: string
  ): Observable<Incidente> {
    return this.http.post<Incidente>(`${this.apiUrl}:8000/incidente`, {
      descripcion,
      estado,
      fechacreacion,
      gestorabc,
      cliente,
      usuario,
      comentarios,
      prioridad
    });
  }
}
