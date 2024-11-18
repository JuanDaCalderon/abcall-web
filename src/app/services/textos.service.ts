import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Textos} from '../models/textos';

@Injectable({
  providedIn: 'root'
})
export class TextosService {
  private apiUrlTextos = environment.urlApi + environment.portTextos;

  constructor(private _http: HttpClient) {}

  getTextos(clienteId): Observable<Textos> {
    return this._http.get<Textos>(this.apiUrlTextos + '/texto/cliente/' + clienteId);
  }

  putTextos(textos: Textos): Observable<Textos> {
    return this._http.put<Textos>(this.apiUrlTextos + '/texto', textos);
  }
}
