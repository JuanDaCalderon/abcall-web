import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RolesPermisosComponent} from './configuracion/roles-permisos/roles-permisos.component';
import {ListIncidenciasComponent} from './incidencias/list-incidencias/list-incidencias.component';
import {CrearClienteComponent} from './configuracion/crear-cliente/crear-cliente.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guards/auth.guard';

export const routes: Routes = [
  {path: '', component: CreateIncidenciasComponent},
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: ListIncidenciasComponent},
      {path: 'roles', title: 'roles', component: RolesPermisosComponent},
      {path: 'cliente', title: 'cliente', component: CrearClienteComponent}
    ]
  },
  {path: '**', component: LoginComponent}
];
