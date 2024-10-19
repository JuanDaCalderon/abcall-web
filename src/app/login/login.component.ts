import {CommonModule, NgIf} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {environment} from '../../environments/environment';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, NgIf, TranslateModule],
  providers: [AuthService, Router],
  standalone: true
})
export class LoginComponent {
  loginForm!: FormGroup;
  authFlag = '';
  language = 'es';
  apiUrl = environment.urlApi + environment.portUsuario;
  translate: TranslateService = inject(TranslateService);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  submit(): void {
    if (this.loginForm.valid) {
      const newlogin = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };

      this.authService.login(newlogin.email, newlogin.password).subscribe(
        (response) => {
          console.log('Has iniciado sesión correctamente:', response);
          //localStorage.setItem('usuario', JSON.stringify(response));
          this.authFlag = 'Has iniciado sesión correctamente';
          this.loginForm.reset();
          this.authService.setUsuario(response);
          this.router.navigate(['/home']);
        },
        (error) => {
          const errorMessage = error?.error?.message;
          console.error('Error al iniciar sesion:', errorMessage);
          this.authFlag = 'Datos de usuario incorrectos';
        }
      );
    }
  }

  public changeLang(lang: string): void {
    this.language = lang;
    this.translate.use(lang);
  }
}
