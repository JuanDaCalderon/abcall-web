import {TestBed} from '@angular/core/testing';
import {CrearIncidenteService} from './crear-incidente.service';
import {Subscription} from 'rxjs';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {Incidente} from '../models/incidentes';
import {environment} from '../../environments/environment';

describe('Service: CrearIncidente', () => {
  let service: CrearIncidenteService;
  let httpMock: HttpTestingController;
  const subscriptions: Subscription[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrearIncidenteService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CrearIncidenteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    subscriptions.forEach((s) => s.unsubscribe());
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an incident', () => {
    const mockIncidente: Incidente = {
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
    };

    subscriptions.push(
      service
        .crearIncidente(
          mockIncidente.cliente.id,
          mockIncidente.fechacreacion,
          mockIncidente.usuario.id,
          mockIncidente.correo,
          mockIncidente.direccion,
          mockIncidente.telefono,
          mockIncidente.descripcion,
          mockIncidente.prioridad,
          mockIncidente.estado,
          mockIncidente.comentarios,
          mockIncidente.canal,
          mockIncidente.tipo
        )
        .subscribe((incidente) => {
          expect(incidente).toEqual(mockIncidente);
        })
    );

    const req = httpMock.expectOne(`${environment.urlApi + environment.portCrearEditarIncidentes}/incidentes`);
    expect(req.request.method).toBe('POST');
    req.flush(mockIncidente);
  });
});
