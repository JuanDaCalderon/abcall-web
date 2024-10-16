import {TestBed, ComponentFixture} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of, throwError} from 'rxjs';
import {LoginComponent} from './login.component';
import {AuthService} from '../services/auth.service';
import {Usuario} from '../models/usuario';
import {HttpClientModule} from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  const mockUsuario: Usuario = {
    id: 1,
    nombres: 'Test User',
    apellidos: 'Test User',
    email: 'test@test.com',
    username: 'test',
    token: 'token'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, LoginComponent, HttpClientModule],
      declarations: []
      //providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should display error message on login failure', async () => {
    spyOn(authService, 'login').and.returnValue(throwError('error'));
    component.loginForm.setValue({email: 'test@test.com', password: 'password123'});
    await component.submit();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(component.authFlag).toBe('Datos de usuario incorrectos');
  });

  it('should display success message on login success', async () => {
    spyOn(component, 'login').and.returnValue(of(mockUsuario));
    component.loginForm.setValue({email: 'test@test.com', password: 'password123'});
    await component.submit();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    expect(component.authFlag).toBe('Has iniciado sesión correctamente');
  });

  it('should validate email field as required and email format', () => {
    const email = component.loginForm.get('email');
    email?.setValue('');
    expect(email?.hasError('required')).toBeTruthy();
    email?.setValue('invalid-email');
    expect(email?.hasError('email')).toBeTruthy();
  });

  it('should validate password field as required and minimum length', () => {
    const password = component.loginForm.get('password');
    password?.setValue('');
    expect(password?.hasError('required')).toBeTruthy();
    password?.setValue('short');
    expect(password?.hasError('minlength')).toBeTruthy();
  });
});
