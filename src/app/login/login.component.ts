import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {catchError, take, Observable} from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Usuario} from '../models/usuario';
import {environment} from '../../environments/environment';
//import { ToastrModule } from 'ngx-toastr';
//import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [],
  standalone: true
})
export class LoginComponent {
  loginForm!: FormGroup;
  authFlag!: string;
  private apiUrl = environment.apiUrl;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
    //private authService: AuthService
  ) {
    this.authFlag = '';
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  public async submit() {
    this.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value)
      .pipe(
        take(1),
        catchError(async () => {
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

  public login(email: string, password: string): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}:8001/usuario/login`, {email, password});
  }

  //changeLanguage(lang: string) {
  //  this.translate.use(lang);
  //}
}
