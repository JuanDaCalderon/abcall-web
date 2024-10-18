import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Incidente} from '../models/incidentes';

@Injectable({
  providedIn: 'root'
})
export class IncidenciasService {
  private apiUrl = 'http://localhost:8003/';

  constructor(private _http: HttpClient) {}

  getIncidencias(): Observable<Incidente[]> {
    return this._http.get<Incidente[]>(this.apiUrl + '/incidentes');
  }
}
