import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Role} from '../models/role';
import {Permiso} from '../models/permiso';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url = environment.urlApi + environment.portRole + '/';
  constructor(private _http: HttpClient) {}

  createRole(role: Role) {
    return this._http.post(this.url + 'role', role);
  }

  getRole(role_id: number): Observable<Role> {
    return this._http.get<Role>(this.url + `role/${role_id}`);
  }

  getAllRoles(): Observable<Role[]> {
    return this._http.get<Role[]>(this.url + 'roles');
  }
  crearPermiso(permiso: Permiso): Observable<Permiso> {
    return this._http.post<Permiso>(this.url + 'permiso', permiso);
  }

  associatePermisoToRole(role_id: number, permisos: [Permiso]): Observable<Role> {
    return this._http.post<Role>(this.url + `role/${role_id}/permiso`, permisos);
  }
}
