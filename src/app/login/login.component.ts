import {CommonModule, NgIf} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, NgIf],
  providers: [AuthService, Router],
  standalone: true
})
export class LoginComponent {
  loginForm!: FormGroup;
  authFlag!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.authFlag = '';
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
          localStorage.setItem('usuario', JSON.stringify(response));
          this.authFlag = 'Has iniciado sesión correctamente';
          this.loginForm.reset();
          this.router.navigate(['/home']);
        },
        (error) => {
          const errorMessage = error?.error?.message || 'Ocurrió un error inesperado';
          console.error('Error al iniciar sesion:', errorMessage);
          this.authFlag = 'Datos de usuario incorrectos';
        }
      );
    }
  }
}
