import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CrearGestorComponent} from './crear-gestor.component';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {GestorService} from '../../services/gestor.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {Gestores, GESTORTIERS, ROLES} from '../../models/users';
import {of} from 'rxjs';

describe('CrearGestorComponent', () => {
  let component: CrearGestorComponent;
  let fixture: ComponentFixture<CrearGestorComponent>;
  const gestorServiceMock = jasmine.createSpyObj('GestorService', ['createGestor']);
  const toastrServiceMock = jasmine.createSpyObj('ToastrService', ['success']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearGestorComponent, ToastrModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        FormBuilder,
        {provide: GestorService, useValue: gestorServiceMock},
        {provide: ToastrService, useValue: toastrServiceMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearGestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit the form and display a toast on successful gestor creation', fakeAsync(() => {
    const gestorResponse: Gestores = {
      id: 'a1c76f9e-9e93-494b-b1ec-b2371e2335eb',
      email: 'pepito@gmail.com',
      username: 'pepito',
      telefono: '23423423432',
      password: '123456789',
      nombres: 'Juan David',
      apellidos: 'Calderon Jimenez',
      direccion: 'Cll 38c No.72j - 55',
      fechacreacion: '2024-10-19T13:39:19.231135',
      rol: ROLES.gestor,
      gestortier: GESTORTIERS.lead,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp1YW5kYWNhbGppQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiYmVkYW1va2EiLCJleHAiOjE3MjkxMjM5MTV9.-ohXO8kW-TsMmAW57H-txm_P1cENenKrcTf6La-DzOI'
    };
    component.crearGestorForm = new FormGroup({
      email: new FormControl(gestorResponse.email),
      username: new FormControl(gestorResponse.username),
      telefono: new FormControl(gestorResponse.telefono),
      password: new FormControl(gestorResponse.password),
      nombres: new FormControl(gestorResponse.nombres),
      apellidos: new FormControl(gestorResponse.apellidos),
      direccion: new FormControl(gestorResponse.direccion),
      rol: new FormControl(gestorResponse.rol),
      gestortier: new FormControl(gestorResponse.gestortier)
    });
    gestorServiceMock.createGestor.and.returnValue(of(gestorResponse));
    component.onSubmit();
    tick();
    expect(component.isLoading).toBeFalse();
    expect(gestorServiceMock.createGestor).toHaveBeenCalled();
    expect(toastrServiceMock.success).toHaveBeenCalledTimes(1);
  }));
});
