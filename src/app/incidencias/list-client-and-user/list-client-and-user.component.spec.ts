import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule, TranslateLoader, TranslateFakeLoader} from '@ngx-translate/core';
import {IncidenciasService} from '../../services/incidencias.service';
import {of, throwError} from 'rxjs';
import {Incidente} from '../../models/incidentes';
import {AuthService} from '../../services/auth.service';
import {Usuario} from '../../models/usuario';
import {ListClientAndUserComponent} from './list-client-and-user.component';

describe('ListClientAndUserComponent', () => {
  let component: ListClientAndUserComponent;
  let fixture: ComponentFixture<ListClientAndUserComponent>;
  let incidenciaServiceStub = jasmine.createSpyObj('IncidenciasService', ['getIncidencias', 'getAllincidenciaByCliente']);
  let userServiceStub = jasmine.createSpyObj('AuthService', ['getAllUsers']);
  beforeEach(async () => {
    incidenciaServiceStub = jasmine.createSpyObj('IncidenciasService', ['getIncidencias', 'getAllincidenciaByCliente']);
    userServiceStub = jasmine.createSpyObj('AuthService', ['getAllUsers']);
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
        ListClientAndUserComponent
      ],
      providers: [
        {provide: IncidenciasService, useFactory: incidenciaServiceStub},
        {provide: AuthService, useFactory: userServiceStub}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListClientAndUserComponent);
    component = fixture.componentInstance;
    const mockIncidencias: Incidente[] = [
      {
        ID: 1,
        DESCRIPCION: 'Test Incidente',
        CLIENTE: 'Cliente Test',
        COMENTARIOS: 'Comentarios Test',
        CORREO: 'CorreoTest@correotest.com',
        DIRECCION: 'Dirección Test',
        ESTADO: 'Abierto',
        FECHACREACION: '19-10-2024 11:39:00',
        PRIORIDAD: 'Alta',
        TELEFONO: '111111111',
        USUARIO: 'Usuario Test'
      },
      {
        ID: 1,
        DESCRIPCION: 'Test Incidente',
        CLIENTE: 'Cliente Test',
        COMENTARIOS: 'Comentarios Test',
        CORREO: 'CorreoTest@correotest.com',
        DIRECCION: 'Dirección Test',
        ESTADO: 'Abierto',
        FECHACREACION: '19-10-2024 11:39:00',
        PRIORIDAD: 'Alta',
        TELEFONO: '111111111',
        USUARIO: 'Usuario Test'
      }
    ];
    const mockUsers: Usuario[] = [
      {
        id: '1',
        email: 'Incidencia 1',
        username: 'Abierto',
        password: 'Alta',
        nombres: 'Cliente 1',
        apellidos: 'Usuario 1',
        telefono: '',
        direccion: '',
        gestortier: '',
        token: '',
        rol: {
          id: 1,
          nombre: '',
          permisos: []
        }
      }
    ];
    userServiceStub.getAllUsers.and.returnValues(of(mockUsers));
    incidenciaServiceStub.getIncidencias.and.returnValues(of(mockIncidencias));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load incidencias on init', () => {
    component.getIncidencias();

    expect(component.incidencias.length).toBe(0);
  });

  it('should load users on init', () => {
    component.getAllUsers();

    expect(component.usuarios.length).toBe(0);
  });

  it('should load incidencias cliente', () => {
    const mockEvent = {target: {value: '1'}} as unknown as Event;
    component.getAllIncidenciasByCliente(mockEvent);

    expect(component.incidencias.length).toBe(0);
  });

  it('should load incidencias usuarios', () => {
    const mockEvent = {target: {value: '1'}} as unknown as Event;
    component.getAllIncidenciasByUserId(mockEvent);

    expect(component.incidencias.length).toBe(0);
  });

  it('should load incidencias on init', () => {
    const incidenciaServiceStub: IncidenciasService = fixture.debugElement.injector.get(IncidenciasService);
    const mockIncidencias: Incidente[] = [
      {
        ID: 1,
        DESCRIPCION: 'Test Incidente',
        CLIENTE: 'Cliente Test',
        COMENTARIOS: 'Comentarios Test',
        CORREO: 'CorreoTest@correotest.com',
        DIRECCION: 'Dirección Test',
        ESTADO: 'Abierto',
        FECHACREACION: '19-10-2024 11:39:00',
        PRIORIDAD: 'Alta',
        TELEFONO: '111111111',
        USUARIO: 'Usuario Test'
      },
      {
        ID: 1,
        DESCRIPCION: 'Test Incidente',
        CLIENTE: 'Cliente Test',
        COMENTARIOS: 'Comentarios Test',
        CORREO: 'CorreoTest@correotest.com',
        DIRECCION: 'Dirección Test',
        ESTADO: 'Abierto',
        FECHACREACION: '19-10-2024 11:39:00',
        PRIORIDAD: 'Alta',
        TELEFONO: '111111111',
        USUARIO: 'Usuario Test'
      }
    ];
    spyOn(incidenciaServiceStub, 'getIncidencias').and.returnValues(of(mockIncidencias));
    component.getIncidencias();
    expect(incidenciaServiceStub.getIncidencias).toHaveBeenCalled();
  });

  it('should load incidencias on init by usuario', () => {
    const incidenciaServiceStub: IncidenciasService = fixture.debugElement.injector.get(IncidenciasService);
    const mockIncidencias: Incidente[] = [
      {
        ID: 1,
        DESCRIPCION: 'Test Incidente',
        CLIENTE: 'Cliente Test',
        COMENTARIOS: 'Comentarios Test',
        CORREO: 'CorreoTest@correotest.com',
        DIRECCION: 'Dirección Test',
        ESTADO: 'Abierto',
        FECHACREACION: '19-10-2024 11:39:00',
        PRIORIDAD: 'Alta',
        TELEFONO: '111111111',
        USUARIO: 'Usuario Test'
      },
      {
        ID: 1,
        DESCRIPCION: 'Test Incidente',
        CLIENTE: 'Cliente Test',
        COMENTARIOS: 'Comentarios Test',
        CORREO: 'CorreoTest@correotest.com',
        DIRECCION: 'Dirección Test',
        ESTADO: 'Abierto',
        FECHACREACION: '19-10-2024 11:39:00',
        PRIORIDAD: 'Alta',
        TELEFONO: '111111111',
        USUARIO: 'Usuario Test'
      }
    ];
    const mockEvent = {target: {value: 'Usuario Test'}} as unknown as Event;
    spyOn(incidenciaServiceStub, 'getAllincidenciaByUserId').and.returnValues(of(mockIncidencias));
    component.getAllIncidenciasByUserId(mockEvent);
    expect(incidenciaServiceStub.getAllincidenciaByUserId).toHaveBeenCalled();
  });

  it('should load incidencias on init by user vacio', () => {
    const incidenciaServiceStub: IncidenciasService = fixture.debugElement.injector.get(IncidenciasService);
    const mockIncidencias: Incidente[] = [
      {
        ID: 1,
        DESCRIPCION: 'Test Incidente',
        CLIENTE: 'Cliente Test',
        COMENTARIOS: 'Comentarios Test',
        CORREO: 'CorreoTest@correotest.com',
        DIRECCION: 'Dirección Test',
        ESTADO: 'Abierto',
        FECHACREACION: '19-10-2024 11:39:00',
        PRIORIDAD: 'Alta',
        TELEFONO: '111111111',
        USUARIO: 'Usuario Test'
      },
      {
        ID: 1,
        DESCRIPCION: 'Test Incidente',
        CLIENTE: 'Cliente Test',
        COMENTARIOS: 'Comentarios Test',
        CORREO: 'CorreoTest@correotest.com',
        DIRECCION: 'Dirección Test',
        ESTADO: 'Abierto',
        FECHACREACION: '19-10-2024 11:39:00',
        PRIORIDAD: 'Alta',
        TELEFONO: '111111111',
        USUARIO: 'Usuario Test'
      }
    ];
    const mockEvent = {target: {value: ''}} as unknown as Event;
    spyOn(incidenciaServiceStub, 'getIncidencias').and.returnValues(of(mockIncidencias));
    component.getAllIncidenciasByUserId(mockEvent);
    expect(incidenciaServiceStub.getIncidencias).toHaveBeenCalled();
  });

  it('should load incidencias on init by cliente', () => {
    const incidenciaServiceStub: IncidenciasService = fixture.debugElement.injector.get(IncidenciasService);
    const mockIncidencias: Incidente[] = [
      {
        ID: 1,
        DESCRIPCION: 'Test Incidente',
        CLIENTE: 'Cliente Test',
        COMENTARIOS: 'Comentarios Test',
        CORREO: 'CorreoTest@correotest.com',
        DIRECCION: 'Dirección Test',
        ESTADO: 'Abierto',
        FECHACREACION: '19-10-2024 11:39:00',
        PRIORIDAD: 'Alta',
        TELEFONO: '111111111',
        USUARIO: 'Usuario Test'
      },
      {
        ID: 1,
        DESCRIPCION: 'Test Incidente',
        CLIENTE: 'Cliente Test',
        COMENTARIOS: 'Comentarios Test',
        CORREO: 'CorreoTest@correotest.com',
        DIRECCION: 'Dirección Test',
        ESTADO: 'Abierto',
        FECHACREACION: '19-10-2024 11:39:00',
        PRIORIDAD: 'Alta',
        TELEFONO: '111111111',
        USUARIO: 'Usuario Test'
      }
    ];
    const mockEvent = {target: {value: 'Usuario Test'}} as unknown as Event;
    spyOn(incidenciaServiceStub, 'getAllincidenciaByCliente').and.returnValues(of(mockIncidencias));
    component.getAllIncidenciasByCliente(mockEvent);
    expect(incidenciaServiceStub.getAllincidenciaByCliente).toHaveBeenCalled();
  });

  it('should load incidencias on init by cliente vacio', () => {
    const incidenciaServiceStub: IncidenciasService = fixture.debugElement.injector.get(IncidenciasService);
    const mockIncidencias: Incidente[] = [
      {
        ID: 1,
        DESCRIPCION: 'Test Incidente',
        CLIENTE: 'Cliente Test',
        COMENTARIOS: 'Comentarios Test',
        CORREO: 'CorreoTest@correotest.com',
        DIRECCION: 'Dirección Test',
        ESTADO: 'Abierto',
        FECHACREACION: '19-10-2024 11:39:00',
        PRIORIDAD: 'Alta',
        TELEFONO: '111111111',
        USUARIO: 'Usuario Test'
      },
      {
        ID: 1,
        DESCRIPCION: 'Test Incidente',
        CLIENTE: 'Cliente Test',
        COMENTARIOS: 'Comentarios Test',
        CORREO: 'CorreoTest@correotest.com',
        DIRECCION: 'Dirección Test',
        ESTADO: 'Abierto',
        FECHACREACION: '19-10-2024 11:39:00',
        PRIORIDAD: 'Alta',
        TELEFONO: '111111111',
        USUARIO: 'Usuario Test'
      }
    ];
    const mockEvent = {target: {value: ''}} as unknown as Event;
    spyOn(incidenciaServiceStub, 'getIncidencias').and.returnValues(of(mockIncidencias));
    component.getAllIncidenciasByCliente(mockEvent);
    expect(incidenciaServiceStub.getIncidencias).toHaveBeenCalled();
  });

  it('should reload incidencias', () => {
    const incidenciaServiceStub: IncidenciasService = fixture.debugElement.injector.get(IncidenciasService);
    const mockIncidencias: Incidente[] = [
      {
        ID: 1,
        DESCRIPCION: 'Incidencia 1',
        ESTADO: 'Abierto',
        PRIORIDAD: 'Alta',
        CLIENTE: 'Cliente 1',
        USUARIO: 'Usuario 1',
        COMENTARIOS: '',
        CORREO: '',
        DIRECCION: '',
        FECHACREACION: '',
        TELEFONO: ''
      }
    ];
    spyOn(incidenciaServiceStub, 'getIncidencias').and.returnValues(of(mockIncidencias));
    component.reloadIncidencias();
    expect(incidenciaServiceStub.getIncidencias).toHaveBeenCalled();
  });

  it('should load all users', () => {
    const userServiceStub: AuthService = fixture.debugElement.injector.get(AuthService);
    spyOn(userServiceStub, 'getAllUsers').and.returnValues(of([]));
    component.getAllUsers();
    expect(userServiceStub.getAllUsers).toHaveBeenCalled();
  });

  it('should change language', () => {
    spyOn(component.translate, 'use');

    component.changeLang('en');

    expect(component.language).toBe('en');
    expect(component.translate.use).toHaveBeenCalledWith('en');
  });

  it('getIncidencias fetches incidencias error', () => {
    const incidenciaServiceStub: IncidenciasService = fixture.debugElement.injector.get(IncidenciasService);
    const errorResponse = {status: 404, message: 'Not found'};
    spyOn(incidenciaServiceStub, 'getIncidencias').and.returnValue(throwError(errorResponse));
    component.getIncidencias();
    expect(incidenciaServiceStub.getIncidencias).toHaveBeenCalledWith();
  });

  it('getIncidencias fetches incidencias error by cliente', () => {
    const incidenciaServiceStub: IncidenciasService = fixture.debugElement.injector.get(IncidenciasService);
    const errorResponse = {status: 404, message: 'Not found'};
    const mockEvent = {target: {value: '1'}} as unknown as Event;
    spyOn(incidenciaServiceStub, 'getAllincidenciaByCliente').and.returnValue(throwError(errorResponse));
    component.getAllIncidenciasByCliente(mockEvent);
    expect(incidenciaServiceStub.getAllincidenciaByCliente).toHaveBeenCalledWith('1');
  });

  it('getIncidencias fetches incidencias error by usuarios', () => {
    const incidenciaServiceStub: IncidenciasService = fixture.debugElement.injector.get(IncidenciasService);
    const errorResponse = {status: 404, message: 'Not found'};
    const mockEvent = {target: {value: '1'}} as unknown as Event;
    spyOn(incidenciaServiceStub, 'getAllincidenciaByUserId').and.returnValue(throwError(errorResponse));
    component.getAllIncidenciasByUserId(mockEvent);
    expect(incidenciaServiceStub.getAllincidenciaByUserId).toHaveBeenCalledWith('1');
  });

  it('getusers fetches usuarios error', () => {
    const userServiceStub: AuthService = fixture.debugElement.injector.get(AuthService);
    const errorResponse = {status: 404, message: 'Not found'};
    spyOn(userServiceStub, 'getAllUsers').and.returnValue(throwError(errorResponse));
    component.getAllUsers();
    expect(userServiceStub.getAllUsers).toHaveBeenCalledWith();
  });
});
