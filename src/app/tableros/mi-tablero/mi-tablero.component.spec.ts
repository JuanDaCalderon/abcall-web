import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MiTableroComponent} from './mi-tablero.component';
import {IncidenciasService} from '../../services/incidencias.service';
import {AuthService} from '../../services/auth.service';
import {ReactiveFormsModule} from '@angular/forms';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {Incidente} from '../../models/incidentes';
import {Usuario} from '../../models/usuario';
import {of} from 'rxjs';
import {ROLES_NAME} from '../../models/users';

describe('MiTableroComponent', () => {
  let component: MiTableroComponent;
  let fixture: ComponentFixture<MiTableroComponent>;
  let incidenciasServiceSpy: jasmine.SpyObj<IncidenciasService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  const usuarioMock: Usuario = {
    id: 'user1',
    rol: {
      nombre: 'usuario',
      id: 0,
      permisos: []
    },
    email: 'usuario@gmail.com',
    username: 'usuario',
    password: '',
    nombres: 'usuario',
    apellidos: 'usuario',
    telefono: '123124234',
    direccion: 'direccion',
    gestortier: 'junior',
    token: ''
  };

  const clienteMock: Usuario = {
    id: '1',
    email: '',
    username: '',
    password: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    direccion: '',
    gestortier: '',
    token: '',
    rol: undefined
  };

  const mockGestores: Usuario[] = [
    {
      id: '3',
      email: 'gestorjunior@gmail.com',
      username: 'gestorjunior',
      telefono: '6666666666',
      password: '123456789',
      nombres: 'gestorjunior',
      apellidos: 'gestorjunior',
      direccion: 'Cll 38c No.72j - 55',
      gestortier: 'junior',
      token: 'token',
      rol: {id: 3, nombre: 'gestor', permisos: []}
    },
    {
      id: '4',
      email: 'gestormid@gmail.com',
      username: 'gestormid',
      telefono: '77777777',
      password: '123456789',
      nombres: 'gestormid',
      apellidos: 'gestormid',
      direccion: 'Cll 38c No.72j - 55',
      gestortier: 'mid',
      token: 'token',
      rol: {id: 3, nombre: 'gestor', permisos: []}
    },
    {
      id: '5',
      email: 'gestorsenior@gmail.com',
      username: 'gestorsenior',
      telefono: '999999',
      password: '123456789',
      nombres: 'juan',
      apellidos: 'senior',
      direccion: 'Cll 38c No.72j - 55',
      gestortier: 'senior',
      token: 'token',
      rol: {id: 3, nombre: 'gestor', permisos: []}
    }
  ];

  const mockIncidentes: Incidente[] = [
    {
      canal: 'web',
      cliente: clienteMock,
      tipo: 'pqrs',
      estado: 'abierto',
      prioridad: 'alta',
      fechacreacion: '01/01/2024',
      comentarios: '',
      correo: '',
      descripcion: '',
      direccion: '',
      id: 0,
      telefono: '',
      usuario: usuarioMock,
      gestor: mockGestores[0]
    },
    {
      canal: 'email',
      cliente: clienteMock,
      tipo: 'incidente',
      estado: 'cerrado',
      prioridad: 'media',
      fechacreacion: '01/01/2024',
      comentarios: '',
      correo: '',
      descripcion: '',
      direccion: '',
      id: 0,
      telefono: '',
      usuario: undefined,
      gestor: mockGestores[1]
    }
  ];

  beforeEach(() => {
    incidenciasServiceSpy = jasmine.createSpyObj('IncidenciasService', ['getIncidencias']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUsuario']);
    TestBed.configureTestingModule({
      imports: [MiTableroComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: IncidenciasService, useValue: incidenciasServiceSpy},
        {provide: AuthService, useValue: authServiceSpy}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(MiTableroComponent);
    component = fixture.componentInstance;
    incidenciasServiceSpy.getIncidencias.and.returnValue(of(mockIncidentes));
    authServiceSpy.getUsuario.and.returnValue(usuarioMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return incidentes by canales of the user', () => {
    const result = component['getCanalesPieValues'](mockIncidentes, usuarioMock.id, ROLES_NAME[usuarioMock.rol.nombre]);
    expect(result).toEqual([1, 0, 0]);
  });

  it('should return incidentes by type of the user', () => {
    const result = component['getTypesPieValues'](mockIncidentes, usuarioMock.id, ROLES_NAME[usuarioMock.rol.nombre]);
    expect(result).toEqual([1, 0]);
  });

  it('should return incidentes by estados of the user', () => {
    const result = component['getEstadosPieValues'](mockIncidentes, usuarioMock.id, ROLES_NAME[usuarioMock.rol.nombre]);
    expect(result).toEqual([1, 0, 0]);
  });

  it('should return incidentes by prioridad of the user', () => {
    const result = component['getPrioridadesPieValues'](mockIncidentes, usuarioMock.id, ROLES_NAME[usuarioMock.rol.nombre]);
    expect(result).toEqual([0, 0, 1]);
  });

  it('should return incidentes by meses of the user', () => {
    const result = component['getIncidentesMeses'](mockIncidentes, usuarioMock.id, ROLES_NAME[usuarioMock.rol.nombre]);
    expect(result).toEqual([{name: 'Incidentes', data: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}]);
  });
});
