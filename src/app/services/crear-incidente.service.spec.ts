import {TestBed} from '@angular/core/testing';
import {CrearIncidenteService} from './crear-incidente.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Incidente} from '../models/incidente';
import {environment} from '../../environments/environment';

describe('Service: CrearIncidente', () => {
  let service: CrearIncidenteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CrearIncidenteService]
    });

    service = TestBed.inject(CrearIncidenteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  fit('should be created', () => {
    expect(service).toBeTruthy();
  });

  fit('should create an incident', () => {
    const mockIncidente: Incidente = {
      id: 1,
      descripcion: 'Test description',
      estado: 'Open',
      fechacreacion: '2023-10-01',
      gestorabc: 'Test Manager',
      cliente: 'Test Client',
      usuario: 'Test User',
      comentarios: 'Test comments',
      prioridad: 'High'
    };

    service
      .crearIncidente(
        mockIncidente.descripcion,
        mockIncidente.estado,
        mockIncidente.fechacreacion,
        mockIncidente.gestorabc,
        mockIncidente.cliente,
        mockIncidente.usuario,
        mockIncidente.comentarios,
        mockIncidente.prioridad
      )
      .subscribe((incidente: Incidente) => {
        expect(incidente).toEqual(mockIncidente);
      });

    const req = httpMock.expectOne(`${environment.apiUrl}:8000/incidente`);
    expect(req.request.method).toBe('POST');
    req.flush(mockIncidente);
  });
});
