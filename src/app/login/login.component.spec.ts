import {ComponentFixture, TestBed, fakeAsync, flush} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ReactiveFormsModule} from '@angular/forms';
import {throwError} from 'rxjs';

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
  const mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
  const mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [LoginComponent, ReactiveFormsModule],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: AuthService, useValue: mockAuthService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    // authService = TestBed.inject(MockAuthService) as jasmine.SpyObj<MockAuthService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('should submit the form and show an error message on failure', fakeAsync(() => {
    const mockError = {message: 'Invalid credentials'};
    mockAuthService.login.and.returnValue(throwError(() => mockError));

    // Rellenar el formulario con datos
    component.loginForm.setValue({
      email: 'example@example.com',
      password: 'wrongPassword'
    });

    component.submit();
    flush(); // Completar la llamada asincrónica

    expect(mockAuthService.login).toHaveBeenCalledWith('example@example.com', 'wrongPassword'); // Verificar que se haya llamado al servicio
    expect(component.authFlag).toBe('Datos de usuario incorrectos'); // Verifica el mensaje correcto
  }));
});
