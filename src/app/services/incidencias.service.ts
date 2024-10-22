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

  getIncidencia(id: number): Observable<Incidente> {
    return this._http.get<Incidente>(`${this.apiUrl}/incidentes/id/${id}`);
  }
}
