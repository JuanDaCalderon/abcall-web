import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Incidente, NewUpdatedIncidencia} from '../models/incidentes';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  private apiUrl_consultar = environment.urlApi + environment.portConsulIncidencias;
  private apiUrl_crear_update = environment.urlApi + environment.portCrearEditarIncidentes;

  constructor(private _http: HttpClient) {}

  getIncidencias(): Observable<Incidente[]> {
    return this._http.get<Incidente[]>(this.apiUrl_consultar + '/incidentes');
  }

  getAllincidenciaByUserId(userId: string): Observable<Incidente[]> {
    return this._http.get<Incidente[]>(`${this.apiUrl_consultar}/incidentes/?usuario=${userId}`);
  }

  getAllincidenciaByCliente(cliente: string): Observable<Incidente[]> {
    return this._http.get<Incidente[]>(`${this.apiUrl_consultar}/incidentes/?cliente=${cliente}`);
  }

  getIncidenciaById(id: string): Observable<Incidente> {
    return this._http.get<Incidente>(`${this.apiUrl_consultar}/incidente/${id}`);
  }

  createIncidencia(incidencia: NewUpdatedIncidencia): Observable<Incidente> {
    return this._http.post<Incidente>(`${this.apiUrl_crear_update}/incidentes`, incidencia);
  }

  updateIncidencia(id: string, incidencia: NewUpdatedIncidencia): Observable<Incidente> {
    return this._http.put<Incidente>(`${this.apiUrl_crear_update}/incidentes/${id}`, incidencia);
  }
}
