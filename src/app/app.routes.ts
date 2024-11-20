import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RolesPermisosComponent} from './configuracion/roles-permisos/roles-permisos.component';
import {ListIncidenciasComponent} from './incidencias/list-incidencias/list-incidencias.component';
import {CrearClienteComponent} from './configuracion/crear-cliente/crear-cliente.component';
import {CrearGestorComponent} from './configuracion/crear-gestor/crear-gestor.component';
import {LoginComponent} from './login/login.component';
import {CreateIncidenciasComponent} from './incidencias/create-incidencias/create-incidencias.component';
import {AuthGuard} from './guards/auth.guard';
import {ListClientAndUserComponent} from './incidencias/list-client-and-user/list-client-and-user.component';
import {ViewIncidenciaComponent} from './incidencias/view-incidencia/view-incidencia.component';
import {TableroComponent} from './tableros/tablero/tablero.component';
import {MiTableroComponent} from './tableros/mi-tablero/mi-tablero.component';
import {TableroPredictivoComponent} from './tableros/tableroPredictivo/tableroPredictivo.component';
import {PersonalizarTextosComponent} from './configuracion/personalizar-textos/personalizar-textos.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: ListIncidenciasComponent},
      {path: 'roles', title: 'roles', component: RolesPermisosComponent},
      {path: 'cliente', title: 'cliente', component: CrearClienteComponent},
      {path: 'gestor', title: 'gestor', component: CrearGestorComponent},
      {path: 'incidencia', title: 'incidencia', component: CreateIncidenciasComponent},
      {path: 'list', title: 'list', component: ListClientAndUserComponent},
      {path: 'mi_tablero', title: 'mi tablero', component: MiTableroComponent},
      {path: 'tablero/:filtro', title: 'tablero', component: TableroComponent},
      {path: 'predictivo', title: 'Tablero analitica predictiva', component: TableroPredictivoComponent},
      {path: 'view-incidencia/:id', title: 'ver incidencia', component: ViewIncidenciaComponent},
      {path: 'personalizar-textos', title: 'personalizar textos', component: PersonalizarTextosComponent}
    ]
  },
  {path: '**', component: LoginComponent}
];
