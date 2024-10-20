import {NgModule} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgFor,
    BrowserAnimationsModule, // Import this
    ToastrModule // Import this
  ],
  providers: [{provide: ToastrModule, useFactory: ToastrModule.forRoot}]
})
export class IncidenciasModule {}
