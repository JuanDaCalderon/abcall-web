import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IaGenerativaService {
  private apiUrl = environment.urlApi + environment.portIaGenerativa;
  constructor(private http: HttpClient) {}

  public generarRespuesta(descripcion: string): Observable<{respuesta: string}> {
    return this.http.post<{respuesta: string}>(this.apiUrl + '/ia/generativa?description=' + descripcion, {});
  }
}
