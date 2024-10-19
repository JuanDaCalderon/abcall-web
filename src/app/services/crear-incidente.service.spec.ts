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

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should create an incident', () => {
    const mockIncidente: Incidente = {
      id: 1,
      cliente: 'Test Client',
      fechacreacion: '2023-10-01',
      usuario: 'Test User',
      correo: 'prueba@prueba.com',
      direccion: 'Test address',
      telefono: '123456789',
      descripcion: 'Test description',
      prioridad: 'High',
      estado: 'Open',
      comentarios: 'Test comments'
    };

    subscriptions.push(
      service
        .crearIncidente(
          mockIncidente.cliente,
          mockIncidente.fechacreacion,
          mockIncidente.usuario,
          mockIncidente.correo,
          mockIncidente.direccion,
          mockIncidente.telefono,
          mockIncidente.descripcion,
          mockIncidente.prioridad,
          mockIncidente.estado,
          mockIncidente.comentarios
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
