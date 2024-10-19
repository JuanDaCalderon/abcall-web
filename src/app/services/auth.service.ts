import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Usuario} from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /** API url */
  private apiUrl = environment.urlApi + environment.portUsuario;
  constructor(private http: HttpClient) {}

  /**
   * Login the user to the backend
   * @param {string} email Email of the user
   * @param {string} password Password of the user
   * @returns {Observable<string>}
   */
  login(email: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/usuario/login`, {email, password});
  }

  logout(): void {
    localStorage.removeItem('usuario');
  }
}
