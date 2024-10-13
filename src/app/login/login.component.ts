import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {catchError, take} from 'rxjs';
import {HttpClientModule} from '@angular/common/http';
//import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [AuthService],
  standalone: true
})
export class LoginComponent {
  loginForm!: FormGroup;
  authError!: boolean;
  authFlag!: string;

  /*ngOnInit() {
    this.authFlag = "";
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }*/

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
    //private toastController: ToastController
  ) {
    this.authFlag = '';
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public async submit() {
    this.authService
      .login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .pipe(
        take(1),
        catchError(async (error) => {
          console.log(error);
          this.authFlag = 'Datos de usuario incorrectos';
        })
      )
      .subscribe(async (value) => {
        if (value) {
          this.authFlag = 'Has iniciado sesión correctamente';
          this.loginForm.reset();
        }
      });
  }

  //changeLanguage(lang: string) {
  //  this.translate.use(lang);
  //}
}
