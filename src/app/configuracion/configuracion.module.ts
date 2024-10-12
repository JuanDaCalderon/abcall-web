import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleService} from '../services/role.service';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [RoleService]
})
export class ConfiguracionModule {}
