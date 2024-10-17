import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Cliente} from '../models/cliente';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url = environment.urlApi + environment.portUsuario + '/';
  constructor(private _http: HttpClient) {}
  createCliente(client: Cliente): Observable<Cliente> {
    return this._http.post<Cliente>(this.url + 'usuario/cliente', client);
  }
}
