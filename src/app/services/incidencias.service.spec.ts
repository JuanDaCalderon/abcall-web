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
        ID: '1',
        DESCRIPCION: 'Incidencia 1',
        ESTADO: 'Abierto',
        PRIORIDAD: 'Alta',
        CLIENTE: 'Cliente 1',
        USUARIO: 'Usuario 1',
        COMENTARIOS: '',
        CORREO: '',
        DIRECCION: '',
        FECHACREACION: '',
        TELEFONO: ''
      },
      {
        ID: '2',
        DESCRIPCION: 'Incidencia 2',
        ESTADO: 'Cerrado',
        PRIORIDAD: 'Baja',
        CLIENTE: 'Cliente 2',
        USUARIO: 'Usuario 2',
        COMENTARIOS: '',
        CORREO: '',
        DIRECCION: '',
        FECHACREACION: '',
        TELEFONO: ''
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
