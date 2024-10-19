import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleService} from '../services/role.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [RoleService]
})
export class ConfiguracionModule {}
