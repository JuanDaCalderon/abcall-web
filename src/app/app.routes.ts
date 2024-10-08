import {Routes} from '@angular/router';
import {AccesosComponent} from './accesos/accesos.component';
import {HomeComponent} from './components/home/home.component';
import {RolesPermisosComponent} from './configuracion/roles-permisos/roles-permisos.component';
export const routes: Routes = [
  {path: '', component: AccesosComponent, pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'roles', component: RolesPermisosComponent},
  {path: '**', component: AccesosComponent}
];
