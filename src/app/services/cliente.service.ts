import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Cliente} from '../models/cliente';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private _http: HttpClient) {}
  createCliente(client: Cliente): Observable<Cliente> {
    return this._http.post<Cliente>('http://localhost:8003/usuario/cliente', client);
  }
}
