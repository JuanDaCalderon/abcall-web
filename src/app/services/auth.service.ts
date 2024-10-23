import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Usuario} from '../models/usuario';
import {Role} from '../models/role';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /** API url */
  private apiUrl = environment.urlApi + environment.portUsuario;
  private usuario: Usuario = new Usuario('', '', '', '', '', '', '', '', '', '', new Role(0, '', []));
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

  setUsuario(usuario: Usuario): void {
    this.usuario = usuario;
    localStorage.setItem('usuario', JSON.stringify(usuario)); // Almacenar en localStorage
  }

  // Método para obtener los datos del usuario
  getUsuario(): Usuario {
    this.usuario = JSON.parse(localStorage.getItem('usuario')!); // Obtener desde localStorage si es necesario
    return this.usuario;
  }

  logout(): void {
    localStorage.removeItem('usuario');
  }

  getAllUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }
}
