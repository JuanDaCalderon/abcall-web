import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Incidente} from '../models/incidentes';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  private apiUrl = environment.urlApi + environment.portConsulIncidencias;

  constructor(private _http: HttpClient) {}

  getIncidencias(): Observable<Incidente[]> {
    return this._http.get<Incidente[]>(this.apiUrl + '/incidentes');
  }

  getAllincidenciaByUserId(userId: string): Observable<Incidente[]> {
    return this._http.get<Incidente[]>(`${this.apiUrl}/incidentes/?usuario=${userId}`);
  }

  getAllincidenciaByCliente(cliente: string): Observable<Incidente[]> {
    return this._http.get<Incidente[]>(`${this.apiUrl}/incidentes/?cliente=${cliente}`);
  }
}
