import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RolesPermisosComponent} from './roles-permisos/roles-permisos.component';

const routes: Routes = [
  {
    path: 'roles',
    component: RolesPermisosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule {}
