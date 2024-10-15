import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleService} from '../services/role.service';
import {ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [RoleService]
})
export class ConfiguracionModule {}
