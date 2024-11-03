import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TableroComponent} from './tablero.component';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {IncidenciasService} from '../../services/incidencias.service';
import {AuthService} from '../../services/auth.service';
import {of} from 'rxjs';
import {Incidente} from '../../models/incidentes';
import {Usuario} from '../../models/usuario';
import {ReactiveFormsModule} from '@angular/forms';

describe('TableroComponent', () => {
  let component: TableroComponent;
  let fixture: ComponentFixture<TableroComponent>;
  let incidenciasServiceSpy: jasmine.SpyObj<IncidenciasService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

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
      usuario: undefined,
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

  beforeEach(async () => {
    incidenciasServiceSpy = jasmine.createSpyObj('IncidenciasService', ['getIncidencias']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getAllUsers']);

    TestBed.configureTestingModule({
      imports: [TableroComponent, ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {provide: IncidenciasService, useValue: incidenciasServiceSpy},
        {provide: AuthService, useValue: authServiceSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableroComponent);
    component = fixture.componentInstance;
    const mockIncidencias: Incidente[] = [
      {
        id: 1,
        canal: 'web',
        tipo: 'pqrs',
        estado: 'abierto',
        prioridad: 'alta',
        fechacreacion: '2024-01-01',
        cliente: {
          id: 'user1',
          rol: {
            nombre: 'cliente',
            id: 0,
            permisos: []
          },
          email: '',
          username: '',
          password: '',
          nombres: '',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: ''
        },
        comentarios: '',
        correo: '',
        descripcion: '',
        direccion: '',
        telefono: '',
        usuario: undefined,
        gestor: mockGestores[0]
      },
      {
        id: 2,
        canal: 'email',
        tipo: 'incidente',
        estado: 'cerrado',
        prioridad: 'media',
        fechacreacion: '2024-02-01',
        cliente: {
          id: 'user2',
          rol: {
            nombre: 'cliente',
            id: 0,
            permisos: []
          },
          email: '',
          username: '',
          password: '',
          nombres: '',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: ''
        },
        comentarios: '',
        correo: '',
        descripcion: '',
        direccion: '',
        telefono: '',
        usuario: undefined,
        gestor: mockGestores[1]
      }
    ];
    incidenciasServiceSpy.getIncidencias.and.returnValue(of(mockIncidencias));
    const mockUsers: Usuario[] = [
      {
        id: 'user1',
        rol: {
          nombre: 'cliente',
          id: 0,
          permisos: []
        },
        email: '',
        username: '',
        password: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        direccion: '',
        gestortier: '',
        token: ''
      },
      {
        id: 'user2',
        rol: {
          nombre: 'gestor',
          id: 0,
          permisos: []
        },
        email: '',
        username: '',
        password: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        direccion: '',
        gestortier: '',
        token: ''
      }
    ];
    authServiceSpy.getAllUsers.and.returnValue(of(mockUsers));
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should properly initialize values ​​in ngOnInit', () => {
    expect(component['incidencias'].length).toBe(2);
    expect(component.clientesUsers.length).toBe(1);
  });

  it('should update the chart options when the client value changes', () => {
    component.cliente.setValue('user1');

    expect(component.pieCanalesChartOptions.series).toEqual(component['getCanalesPieValues'](component['incidencias'], 'user1'));
    expect(component.pieTipoChartOptions.series).toEqual(component['getTypesPieValues'](component['incidencias'], 'user1'));
    expect(component.pieEstadoChartOptions.series).toEqual(component['getEstadosPieValues'](component['incidencias'], 'user1'));
    expect(component.piePrioridadChartOptions.series).toEqual(component['getPrioridadesPieValues'](component['incidencias'], 'user1'));
    expect(component.barsIncidentsChartOptions.series).toEqual(component['getIncidentesMeses'](component['incidencias'], 'user1'));
  });

  it('should calculate correct pie data for canales', () => {
    const result = component['getCanalesPieValues'](mockIncidentes, 'todos');
    expect(result).toEqual([1, 1, 0]);
  });

  it('should filter incidents by userId for getCanalesPieValues', () => {
    const incidentes: Incidente[] = [
      {
        ...mockIncidentes[0]
      },
      {
        ...mockIncidentes[1],
        cliente: {...mockIncidentes[1].cliente, id: '2'}
      }
    ];
    const result = component['getCanalesPieValues'](incidentes, '1');
    expect(result).toEqual([1, 0, 0]);
  });

  it('should calculate correct pie data for types', () => {
    const result = component['getTypesPieValues'](mockIncidentes, 'todos');
    expect(result).toEqual([1, 1]);
  });

  it('should calculate correct pie data for estados', () => {
    const result = component['getEstadosPieValues'](mockIncidentes, 'todos');
    expect(result).toEqual([1, 0, 1]);
  });

  it('should calculate correct pie data for prioridades', () => {
    const result = component['getPrioridadesPieValues'](mockIncidentes, 'todos');
    expect(result).toEqual([0, 1, 1]);
  });

  it('should calculate correct pie data for meses', () => {
    const result = component['getIncidentesMeses'](mockIncidentes, 'todos');
    expect(result).toEqual([{name: 'Incidentes', data: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}]);
  });
});
