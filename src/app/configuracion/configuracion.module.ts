import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleService} from '../services/role.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PersonalizarTextosComponent} from './personalizar-textos/personalizar-textos.component';
@NgModule({
  declarations: [PersonalizarTextosComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [RoleService]
})
export class ConfiguracionModule {}
