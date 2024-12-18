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
  let userServiceStub = jasmine.createSpyObj('AuthService', ['getAllUsers', 'getAllUsersByRole']);
  beforeEach(async () => {
    incidenciaServiceStub = jasmine.createSpyObj('IncidenciasService', ['getIncidencias', 'getAllincidenciaByCliente']);
    userServiceStub = jasmine.createSpyObj('AuthService', ['getAllUsers', 'getAllUsersByRole']);
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

    const mockIncidencias: Incidente[] = [
      {
        id: 1,
        cliente: {
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
          rol: {
            id: 4,
            nombre: 'cliente',
            permisos: []
          }
        },
        fechacreacion: '2023-10-01',
        usuario: {
          id: '2',
          email: '',
          username: '',
          password: '',
          nombres: '',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 2,
            nombre: 'cliente',
            permisos: []
          }
        },
        correo: 'prueba@prueba.com',
        direccion: 'Test address',
        telefono: '123456789',
        descripcion: 'Test description',
        prioridad: 'High',
        estado: 'Open',
        comentarios: 'Test comments',
        canal: 'web',
        tipo: 'icidencia',
        gestor: mockGestores[0]
      },
      {
        id: 2,
        cliente: {
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
          rol: {
            id: 4,
            nombre: 'cliente',
            permisos: []
          }
        },
        fechacreacion: '2023-10-01',
        usuario: {
          id: '2',
          email: '',
          username: '',
          password: '',
          nombres: '',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 2,
            nombre: 'cliente',
            permisos: []
          }
        },
        correo: 'prueba@prueba.com',
        direccion: 'Test address',
        telefono: '123456789',
        descripcion: 'Test description',
        prioridad: 'High',
        estado: 'Open',
        comentarios: 'Test comments',
        canal: 'web',
        tipo: 'icidencia',
        gestor: mockGestores[1]
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

  it('should load users on init', () => {
    component.getAllUsersByRole();

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
    const mockIncidencias: Incidente[] = [
      {
        id: 1,
        cliente: {
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
          rol: {
            id: 4,
            nombre: 'cliente',
            permisos: []
          }
        },
        fechacreacion: '2023-10-01',
        usuario: {
          id: '2',
          email: '',
          username: '',
          password: '',
          nombres: '',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 2,
            nombre: 'cliente',
            permisos: []
          }
        },
        correo: 'prueba@prueba.com',
        direccion: 'Test address',
        telefono: '123456789',
        descripcion: 'Test description',
        prioridad: 'High',
        estado: 'Open',
        comentarios: 'Test comments',
        canal: 'web',
        tipo: 'icidencia',
        gestor: mockGestores[0]
      },
      {
        id: 2,
        cliente: {
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
          rol: {
            id: 4,
            nombre: 'cliente',
            permisos: []
          }
        },
        fechacreacion: '2023-10-01',
        usuario: {
          id: '2',
          email: '',
          username: '',
          password: '',
          nombres: '',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 2,
            nombre: 'cliente',
            permisos: []
          }
        },
        correo: 'prueba@prueba.com',
        direccion: 'Test address',
        telefono: '123456789',
        descripcion: 'Test description',
        prioridad: 'High',
        estado: 'Open',
        comentarios: 'Test comments',
        canal: 'web',
        tipo: 'icidencia',
        gestor: mockGestores[1]
      }
    ];
    spyOn(incidenciaServiceStub, 'getIncidencias').and.returnValues(of(mockIncidencias));
    component.getIncidencias();
    expect(incidenciaServiceStub.getIncidencias).toHaveBeenCalled();
  });

  it('should load incidencias on init by usuario', () => {
    const incidenciaServiceStub: IncidenciasService = fixture.debugElement.injector.get(IncidenciasService);
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
    const mockIncidencias: Incidente[] = [
      {
        id: 1,
        cliente: {
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
          rol: {
            id: 4,
            nombre: 'cliente',
            permisos: []
          }
        },
        fechacreacion: '2023-10-01',
        usuario: {
          id: '2',
          email: '',
          username: '',
          password: '',
          nombres: '',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 2,
            nombre: 'cliente',
            permisos: []
          }
        },
        correo: 'prueba@prueba.com',
        direccion: 'Test address',
        telefono: '123456789',
        descripcion: 'Test description',
        prioridad: 'High',
        estado: 'Open',
        comentarios: 'Test comments',
        canal: 'web',
        tipo: 'icidencia',
        gestor: mockGestores[0]
      },
      {
        id: 2,
        cliente: {
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
          rol: {
            id: 4,
            nombre: 'cliente',
            permisos: []
          }
        },
        fechacreacion: '2023-10-01',
        usuario: {
          id: '2',
          email: '',
          username: '',
          password: '',
          nombres: '',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 2,
            nombre: 'cliente',
            permisos: []
          }
        },
        correo: 'prueba@prueba.com',
        direccion: 'Test address',
        telefono: '123456789',
        descripcion: 'Test description',
        prioridad: 'High',
        estado: 'Open',
        comentarios: 'Test comments',
        canal: 'web',
        tipo: 'icidencia',
        gestor: mockGestores[1]
      }
    ];
    const mockEvent = {target: {value: 'Usuario Test'}} as unknown as Event;
    spyOn(incidenciaServiceStub, 'getAllincidenciaByUserId').and.returnValues(of(mockIncidencias));
    component.getAllIncidenciasByUserId(mockEvent);
    expect(incidenciaServiceStub.getAllincidenciaByUserId).toHaveBeenCalled();
  });

  it('should load incidencias on init by user vacio', () => {
    const incidenciaServiceStub: IncidenciasService = fixture.debugElement.injector.get(IncidenciasService);
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
    const mockIncidencias: Incidente[] = [
      {
        id: 1,
        cliente: {
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
          rol: {
            id: 4,
            nombre: 'cliente',
            permisos: []
          }
        },
        fechacreacion: '2023-10-01',
        usuario: {
          id: '2',
          email: '',
          username: '',
          password: '',
          nombres: '',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 2,
            nombre: 'cliente',
            permisos: []
          }
        },
        correo: 'prueba@prueba.com',
        direccion: 'Test address',
        telefono: '123456789',
        descripcion: 'Test description',
        prioridad: 'High',
        estado: 'Open',
        comentarios: 'Test comments',
        canal: 'web',
        tipo: 'icidencia',
        gestor: mockGestores[0]
      },
      {
        id: 2,
        cliente: {
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
          rol: {
            id: 4,
            nombre: 'cliente',
            permisos: []
          }
        },
        fechacreacion: '2023-10-01',
        usuario: {
          id: '2',
          email: '',
          username: '',
          password: '',
          nombres: '',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 2,
            nombre: 'cliente',
            permisos: []
          }
        },
        correo: 'prueba@prueba.com',
        direccion: 'Test address',
        telefono: '123456789',
        descripcion: 'Test description',
        prioridad: 'High',
        estado: 'Open',
        comentarios: 'Test comments',
        canal: 'web',
        tipo: 'icidencia',
        gestor: mockGestores[1]
      }
    ];
    const mockEvent = {target: {value: ''}} as unknown as Event;
    spyOn(incidenciaServiceStub, 'getIncidencias').and.returnValues(of(mockIncidencias));
    component.getAllIncidenciasByUserId(mockEvent);
    expect(incidenciaServiceStub.getIncidencias).toHaveBeenCalled();
  });

  it('should load incidencias on init by cliente', () => {
    const incidenciaServiceStub: IncidenciasService = fixture.debugElement.injector.get(IncidenciasService);
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
    const mockIncidencias: Incidente[] = [
      {
        id: 1,
        cliente: {
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
          rol: {
            id: 4,
            nombre: 'cliente',
            permisos: []
          }
        },
        fechacreacion: '2023-10-01',
        usuario: {
          id: '2',
          email: '',
          username: '',
          password: '',
          nombres: '',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 2,
            nombre: 'cliente',
            permisos: []
          }
        },
        correo: 'prueba@prueba.com',
        direccion: 'Test address',
        telefono: '123456789',
        descripcion: 'Test description',
        prioridad: 'High',
        estado: 'Open',
        comentarios: 'Test comments',
        canal: 'web',
        tipo: 'icidencia',
        gestor: mockGestores[0]
      },
      {
        id: 2,
        cliente: {
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
          rol: {
            id: 4,
            nombre: 'cliente',
            permisos: []
          }
        },
        fechacreacion: '2023-10-01',
        usuario: {
          id: '2',
          email: '',
          username: '',
          password: '',
          nombres: '',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 2,
            nombre: 'cliente',
            permisos: []
          }
        },
        correo: 'prueba@prueba.com',
        direccion: 'Test address',
        telefono: '123456789',
        descripcion: 'Test description',
        prioridad: 'High',
        estado: 'Open',
        comentarios: 'Test comments',
        canal: 'web',
        tipo: 'icidencia',
        gestor: mockGestores[1]
      }
    ];
    const mockEvent = {target: {value: 'Usuario Test'}} as unknown as Event;
    spyOn(incidenciaServiceStub, 'getAllincidenciaByCliente').and.returnValues(of(mockIncidencias));
    component.getAllIncidenciasByCliente(mockEvent);
    expect(incidenciaServiceStub.getAllincidenciaByCliente).toHaveBeenCalled();
  });

  it('should load incidencias on init by cliente vacio', () => {
    const incidenciaServiceStub: IncidenciasService = fixture.debugElement.injector.get(IncidenciasService);
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
    const mockIncidencias: Incidente[] = [
      {
        id: 1,
        cliente: {
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
          rol: {
            id: 4,
            nombre: 'cliente',
            permisos: []
          }
        },
        fechacreacion: '2023-10-01',
        usuario: {
          id: '2',
          email: '',
          username: '',
          password: '',
          nombres: '',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 2,
            nombre: 'cliente',
            permisos: []
          }
        },
        correo: 'prueba@prueba.com',
        direccion: 'Test address',
        telefono: '123456789',
        descripcion: 'Test description',
        prioridad: 'High',
        estado: 'Open',
        comentarios: 'Test comments',
        canal: 'web',
        tipo: 'icidencia',
        gestor: mockGestores[0]
      },
      {
        id: 2,
        cliente: {
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
          rol: {
            id: 4,
            nombre: 'cliente',
            permisos: []
          }
        },
        fechacreacion: '2023-10-01',
        usuario: {
          id: '2',
          email: '',
          username: '',
          password: '',
          nombres: '',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 2,
            nombre: 'cliente',
            permisos: []
          }
        },
        correo: 'prueba@prueba.com',
        direccion: 'Test address',
        telefono: '123456789',
        descripcion: 'Test description',
        prioridad: 'High',
        estado: 'Open',
        comentarios: 'Test comments',
        canal: 'web',
        tipo: 'icidencia',
        gestor: mockGestores[1]
      }
    ];
    const mockEvent = {target: {value: ''}} as unknown as Event;
    spyOn(incidenciaServiceStub, 'getIncidencias').and.returnValues(of(mockIncidencias));
    component.getAllIncidenciasByCliente(mockEvent);
    expect(incidenciaServiceStub.getIncidencias).toHaveBeenCalled();
  });

  it('should reload incidencias', () => {
    const incidenciaServiceStub: IncidenciasService = fixture.debugElement.injector.get(IncidenciasService);

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
    const mockIncidencias: Incidente[] = [
      {
        id: 1,
        cliente: {
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
          rol: {
            id: 4,
            nombre: 'cliente',
            permisos: []
          }
        },
        fechacreacion: '2023-10-01',
        usuario: {
          id: '2',
          email: '',
          username: '',
          password: '',
          nombres: '',
          apellidos: '',
          telefono: '',
          direccion: '',
          gestortier: '',
          token: '',
          rol: {
            id: 2,
            nombre: 'cliente',
            permisos: []
          }
        },
        correo: 'prueba@prueba.com',
        direccion: 'Test address',
        telefono: '123456789',
        descripcion: 'Test description',
        prioridad: 'High',
        estado: 'Open',
        comentarios: 'Test comments',
        canal: 'web',
        tipo: 'icidencia',
        gestor: mockGestores[0]
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

  it('should load all users by role', () => {
    const userServiceStub: AuthService = fixture.debugElement.injector.get(AuthService);
    spyOn(userServiceStub, 'getAllUsersByRole').and.returnValues(of([]));
    component.getAllUsersByRole();
    expect(userServiceStub.getAllUsersByRole).toHaveBeenCalled();
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

  it('getusers fetches usuarios by role error', () => {
    const userServiceStub: AuthService = fixture.debugElement.injector.get(AuthService);
    const errorResponse = {status: 404, message: 'Not found'};
    spyOn(userServiceStub, 'getAllUsersByRole').and.returnValue(throwError(errorResponse));
    component.getAllUsersByRole();
    expect(userServiceStub.getAllUsersByRole).toHaveBeenCalledWith(4);
  });
});
