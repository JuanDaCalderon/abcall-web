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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an incident', () => {
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
      .subscribe((incidente: Incidente) => {
        expect(incidente).toEqual(mockIncidente);
      });

    const req = httpMock.expectOne(`${environment.apiUrl}:8000/incidente`);
    expect(req.request.method).toBe('POST');
    req.flush(mockIncidente);
  });
});
