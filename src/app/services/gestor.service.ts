import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Gestores} from '../models/users';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GestorService {
  /** API url */
  private apiUrl = environment.apiUrl;
  private userPort = environment.userPort;
  constructor(private http: HttpClient) {}

  /**
   * Create the gestor in the backend
   * @param {Gestores} gestor gestor DTO
   * @returns {Observable<Gestores>}
   */
  public createGestor(gestor: Gestores): Observable<Gestores> {
    return this.http.post<Gestores>(`${this.apiUrl}${this.userPort}/usuario/register`, gestor);
  }
}
