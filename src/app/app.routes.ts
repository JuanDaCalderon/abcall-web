import {Routes} from '@angular/router';
import {AccesosComponent} from './accesos/accesos.component';
import {HomeComponent} from './components/home/home.component';
import {RolesPermisosComponent} from './configuracion/roles-permisos/roles-permisos.component';
import {ListIncidenciasComponent} from './incidencias/list-incidencias/list-incidencias.component';
import {CrearClienteComponent} from './configuracion/crear-cliente/crear-cliente.component';
import {CrearGestorComponent} from './configuracion/crear-gestor/crear-gestor.component';
export const routes: Routes = [
  {path: '', component: AccesosComponent},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {path: '', component: ListIncidenciasComponent},
      {path: 'roles', component: RolesPermisosComponent},
      {path: 'cliente', component: CrearClienteComponent},
      {path: 'gestor', component: CrearGestorComponent}
    ]
  },
  {path: '**', component: AccesosComponent}
];
