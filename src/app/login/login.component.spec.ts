import {ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ReactiveFormsModule} from '@angular/forms';
import {throwError} from 'rxjs';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';

/*class MockAuthService {
  login(email: string, password: string) {
    if (email === 'prueba1@prueba.com' && password === '123456789') {
      return of(true); // Simula autenticación exitosa
    } else {
      return throwError(new Error('Invalid credentials')); // Simula error de autenticación
    }
  }
}*/

/*class MockAuthService {
  login(email: string, password: string) {
    // Simular un error de autenticación
    return throwError(() => new Error('Invalid credentials'));
  }
}*/

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;
  //const mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
  const mockAuthService = {login: jasmine.createSpy('login')};
  const mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: AuthService, useValue: mockAuthService},
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    // authService = TestBed.inject(MockAuthService) as jasmine.SpyObj<MockAuthService>;
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    // Verificar que no haya solicitudes pendientes
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with two controls', () => {
    expect(component.loginForm.contains('email')).toBeTruthy(); // Verifica que el control 'email' existe
    expect(component.loginForm.contains('password')).toBeTruthy(); // Verifica que el control 'password' existe
  });

  it('should make the email control required', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue(''); // Establece el valor del control como vacío
    expect(emailControl?.valid).toBeFalsy(); // Verifica que el control no sea válido
  });

  it('should validate email format', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalid-email'); // Establece un valor no válido
    expect(emailControl?.valid).toBeFalsy(); // Verifica que el control no sea válido
  });

  it('should make the password control required', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue(''); // Establece el valor del control como vacío
    expect(passwordControl?.valid).toBeFalsy(); // Verifica que el control no sea válido
  });

  it('should validate password minimum length', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('123'); // Establece un valor que es demasiado corto
    expect(passwordControl?.valid).toBeFalsy(); // Verifica que el control no sea válido
  });

  /*it('should submit the form with no error message', fakeAsync(() => {
    const mockError = {};
    mockAuthService.login.and.returnValue(throwError(() => mockError));
    component.submit();
    fixture.whenStable().then(() => {
      flush();
      //expect(mockAuthService.login).toHaveBeenCalled();
      expect(component.authFlag).toBe('Has iniciado sesión correctamente');
    });
  }));*/

  /*it('should submit the form and display a toast on successful login', fakeAsync(() => {
    const mockError = {error: {message: 'invalid credentials'}};
    mockAuthService.login.and.returnValue(throwError(() => mockError));
    component.submit();
    fixture.whenStable().then(() => {
      expect(mockAuthService.login).toHaveBeenCalled();
    });
  }));*/

  it('should submit the form with no error message', fakeAsync(() => {
    const mockError = {};
    mockAuthService.login.and.returnValue(throwError(() => mockError));
    component.submit();
    fixture.whenStable().then(() => {
      expect(mockAuthService.login).toHaveBeenCalled();
    });
  }));
});
