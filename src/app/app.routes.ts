import {Routes} from '@angular/router';
import {AccesosComponent} from './accesos/accesos.component';
import {HomeComponent} from './components/home/home.component';
import {RolesPermisosComponent} from './configuracion/roles-permisos/roles-permisos.component';
import {ListIncidenciasComponent} from './incidencias/list-incidencias/list-incidencias.component';
import {CrearClienteComponent} from './configuracion/crear-cliente/crear-cliente.component';
export const routes: Routes = [
  {path: '', component: AccesosComponent},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {path: '', component: ListIncidenciasComponent},
      {path: 'roles', title: 'roles', component: RolesPermisosComponent},
      {path: 'cliente', title: 'cliente', component: CrearClienteComponent}
    ]
  },
  {path: '**', component: AccesosComponent}
];
