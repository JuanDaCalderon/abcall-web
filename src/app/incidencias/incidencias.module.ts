import {NgModule} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {ViewIncidenciaComponent} from './view-incidencia/view-incidencia.component';
import {ListIncidenciasComponent} from './list-incidencias/list-incidencias.component';

@NgModule({
  declarations: [ViewIncidenciaComponent, ListIncidenciasComponent],
  imports: [CommonModule, NgFor, BrowserAnimationsModule, ToastrModule],
  providers: [{provide: ToastrModule, useFactory: ToastrModule.forRoot}]
})
export class IncidenciasModule {}
