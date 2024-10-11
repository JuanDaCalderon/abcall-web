import {Routes} from '@angular/router';
import {AccesosComponent} from './accesos/accesos.component';
import {HomeComponent} from './components/home/home.component';
import {RolesPermisosComponent} from './configuracion/roles-permisos/roles-permisos.component';
import {ListIncidenciasComponent} from './incidencias/list-incidencias/list-incidencias.component';
import {LoginComponent} from './login/login.component';
export const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {path: '', component: ListIncidenciasComponent},
      {path: 'roles', component: RolesPermisosComponent}
    ]
  },
  {path: '**', component: AccesosComponent}
];
