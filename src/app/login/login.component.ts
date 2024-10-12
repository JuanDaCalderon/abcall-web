import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {AuthService} from '../services/auth.service';
import {catchError, take} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, HttpClientModule],
  providers: [AuthService],
  standalone: true
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  authError!: boolean;
  authOk!: boolean;

  ngOnInit() {
    this.authError = false;
    this.authOk = false;
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  /*constructor(private formBuilder: FormBuilder, private translate: TranslateService) {
      translate.addLangs(['en', 'es']);
      translate.setDefaultLang('es');
    }*/

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  public async submit() {
    console.log('prueba');
    this.authService
      .login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .pipe(
        take(1),
        catchError(async (error) => {
          console.log('Error de autenticacion');
          console.log(error);
          this.authError = true;
          this.authOk = false;
        })
      )
      .subscribe(async (value) => {
        if (value) {
          console.log('Autenticacion exitosa');
          this.loginForm.reset();
          this.authOk = true;
          this.authError = false;
        }
      });
  }

  //changeLanguage(lang: string) {
  //  this.translate.use(lang);
  //}
}
