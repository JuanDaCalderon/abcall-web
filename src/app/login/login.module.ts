import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../services/auth.service';

@NgModule({
  imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, AuthService, HttpClientModule],
  declarations: [],
  exports: [LoginComponent],
  providers: []
})
export class LoginModule {}
