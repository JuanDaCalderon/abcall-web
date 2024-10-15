import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Role} from '../models/role';
import {Permiso} from '../models/permiso';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private _http: HttpClient) {}

  createRole(role: Role) {
    return this._http.post('http://localhost:8002/role', role);
  }

  getRole(role_id: number): Observable<Role> {
    return this._http.get<Role>('http://localhost:8002/role/' + role_id);
  }

  getAllRoles(): Observable<Role[]> {
    return this._http.get<Role[]>('http://localhost:8002/roles');
  }
  crearPermiso(permiso: Permiso): Observable<Permiso> {
    return this._http.post<Permiso>('http://localhost:8002/permiso', permiso);
  }

  associatePermisoToRole(role_id: number, permisos: [Permiso]): Observable<Role> {
    return this._http.post<Role>('http://localhost:8002/role/' + role_id + '/permiso', permisos);
  }
}
