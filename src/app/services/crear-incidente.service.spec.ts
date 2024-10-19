import {TestBed} from '@angular/core/testing';
import {CrearIncidenteService} from './crear-incidente.service';
import {Subscription} from 'rxjs';
import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {Incidente} from '../models/incidente';
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
      ID: 1,
      CLIENTE: 'Test Client',
      FECHACREACION: '2023-10-01',
      USUARIO: 'Test User',
      CORREO: 'prueba@prueba.com',
      DIRECCION: 'Test address',
      TELEFONO: '123456789',
      DESCRIPCION: 'Test description',
      PRIORIDAD: 'High',
      ESTADO: 'Open',
      COMENTARIOS: 'Test comments'
    };

    subscriptions.push(
      service
        .crearIncidente(
          mockIncidente.CLIENTE,
          mockIncidente.FECHACREACION,
          mockIncidente.USUARIO,
          mockIncidente.CORREO,
          mockIncidente.DIRECCION,
          mockIncidente.TELEFONO,
          mockIncidente.DESCRIPCION,
          mockIncidente.PRIORIDAD,
          mockIncidente.ESTADO,
          mockIncidente.COMENTARIOS
        )
        .subscribe((incidente) => {
          expect(incidente).toEqual(mockIncidente);
        })
    );

    const req = httpMock.expectOne(`${environment.urlApi + environment.portCrearIncidentes}/incidentes`);
    expect(req.request.method).toBe('POST');
    req.flush(mockIncidente);
  });
});
