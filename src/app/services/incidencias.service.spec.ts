import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {IncidenciasService} from './incidencias.service';
import {Incidente} from '../models/incidentes';
import {environment} from '../../environments/environment';

describe('IncidenciasService', () => {
  let service: IncidenciasService;
  let httpMock: HttpTestingController;

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
        comentarios: 'Test comments'
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
        comentarios: 'Test comments'
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
});
