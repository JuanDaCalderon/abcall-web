import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, RouterModule],
  declarations: [],
  exports: [],
  providers: [AuthService]
})
export class LoginModule {}
