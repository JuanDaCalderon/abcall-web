import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {IncidenciasService} from './incidencias.service';
import {Incidente} from '../models/incidentes';
import {environment} from '../../environments/environment';

describe('IncidenciasService', () => {
  let service: IncidenciasService;
  let httpMock: HttpTestingController;

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
      tipo: 'incidencia',
      gestor: {
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
      }
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
      tipo: 'incidencia',
      gestor: {
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
      }
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IncidenciasService]
    });
    service = TestBed.inject(IncidenciasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch incidencias', () => {
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
        tipo: 'incidencia',
        gestor: {
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
        }
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
        tipo: 'incidencia',
        gestor: {
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
        }
      }
    ];

    service.getIncidencias().subscribe((incidencias) => {
      expect(incidencias.length).toBe(2);
      expect(incidencias).toEqual(mockIncidencias);
    });

    const req = httpMock.expectOne(`${environment.urlApi}${environment.portConsulIncidencias}/incidentes`);
    expect(req.request.method).toBe('GET');
    req.flush(mockIncidencias);
  });

  it('should fetch incidencia by id', () => {
    const id = '1';
    const mockIncidencia = mockIncidencias[0];

    service.getIncidenciaById(id).subscribe((incidencia) => {
      expect(incidencia).toEqual(mockIncidencia);
    });

    const req = httpMock.expectOne(`${environment.urlApi}${environment.portConsulIncidencias}/incidente/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockIncidencia);
  });

  it('should fetch incidencias by cliente', () => {
    const cliente = '1';

    service.getAllincidenciaByCliente(cliente).subscribe((incidencias) => {
      expect(incidencias.length).toBe(2);
      expect(incidencias).toEqual(mockIncidencias);
    });

    const req = httpMock.expectOne(`${environment.urlApi}${environment.portConsulIncidencias}/incidentes/?cliente=${cliente}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockIncidencias);
  });

  it('should fetch incidencia by id', () => {
    const id = '1';
    const mockIncidencia = mockIncidencias[0];

    service.getIncidenciaById(id).subscribe((incidencia) => {
      expect(incidencia).toEqual(mockIncidencia);
    });

    const req = httpMock.expectOne(`${environment.urlApi}${environment.portConsulIncidencias}/incidente/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockIncidencia);
  });
});
