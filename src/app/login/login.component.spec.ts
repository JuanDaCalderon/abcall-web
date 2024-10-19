import {TestBed, ComponentFixture} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {of, throwError} from 'rxjs';
import {LoginComponent} from './login.component';
import {AuthService} from '../services/auth.service';
import {Usuario} from '../models/usuario';
import {RouterTestingModule} from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let AuthServiceStub = jasmine.createSpyObj('AuthService', ['login']);
  let translateService: TranslateService;

  beforeEach(async () => {
    AuthServiceStub = jasmine.createSpyObj('AuthService', ['login']);
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, LoginComponent, RouterTestingModule, TranslateModule.forRoot()],
      declarations: [],
      providers: [{provide: AuthService, useValue: AuthServiceStub}]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    //authService = TestBed.inject(AuthService);
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
    const AuthServiceStub: AuthService = fixture.debugElement.injector.get(AuthService);
    const errorResponse = {error: {message: 'Datos de usuario incorrectos'}};
    spyOn(AuthServiceStub, 'login').and.returnValue(throwError(errorResponse));
    component.loginForm.setValue({email: 'test@test.com', password: 'password123'});
    component.submit();
    expect(component.authFlag).toBe('Datos de usuario incorrectos');
  });

  it('should display error message on login failure 2', async () => {
    const AuthServiceStub: AuthService = fixture.debugElement.injector.get(AuthService);
    const errorResponse = {error: {}};
    spyOn(AuthServiceStub, 'login').and.returnValue(throwError(errorResponse));
    component.loginForm.setValue({email: 'test@test.com', password: 'password123'});
    component.submit();
    expect(component.authFlag).toBe('Datos de usuario incorrectos');
  });

  it('should display success message on login success', async () => {
    const AuthServiceStub: AuthService = fixture.debugElement.injector.get(AuthService);
    const mockResponse: Usuario = {
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW5kYWNhbGppQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYmVkYW1va2EiLCJleHAiOjE3Mjg3MDE4NDV9.8AweMAcU5LCvA7TzPRf5kRJgHCRgrTEEfEC_gg4Ml7c'
    } as Usuario;
    spyOn(AuthServiceStub, 'login').and.returnValue(of(mockResponse));
    component.loginForm.setValue({email: 'test@test.com', password: 'password123'});
    component.submit();
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

  it('should change language when changeLang is called', () => {
    const translateSpy = spyOn(translateService, 'use');
    component.changeLang('en');
    expect(component.language).toBe('en');
    expect(translateSpy).toHaveBeenCalledWith('en');
  });
});
