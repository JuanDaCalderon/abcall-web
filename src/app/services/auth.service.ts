import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /** API url */
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  /**
   * Login the user to the backend
   * @param {string} email Email of the user
   * @param {string} password Password of the user
   * @returns {Observable<string>}
   */
  public login(email: string, password: string): Observable<Response> {
    return this.http.post<Response>(`${this.apiUrl}/usuario/login`, {email, password});
  }
}
