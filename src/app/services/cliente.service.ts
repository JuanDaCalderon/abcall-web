import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {UsuarioInterface} from '../models/usuario-interface';
import {Usuario} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url = environment.urlApi + environment.portUsuario + '/';
  constructor(private _http: HttpClient) {}

  createCliente(client: UsuarioInterface): Observable<Usuario> {
    return this._http.post<Usuario>(this.url + 'usuario/register', client);
  }

  getUsers(rol: string): Observable<Usuario[]> {
    return this._http.get<Usuario[]>(this.url + 'usuarios/' + rol);
  }
}
