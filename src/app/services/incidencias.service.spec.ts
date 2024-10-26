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
        id: '1',
        descripcion: 'Incidencia 1',
        estado: 'Abierto',
        prioridad: 'Alta',
        cliente: 'Cliente 1',
        usuario: 'Usuario 1',
        comentarios: 'Comentario prueba 1',
        correo: 'prueba@prueba.com',
        direccion: 'Calle 1 # 2 -3',
        fechacreacion: '2024-01-01 10:00:00',
        telefono: '300123456789',
        tipo: 'incidencia',
        canal: 'web'
      },
      {
        id: '2',
        descripcion: 'Incidencia 2',
        estado: 'Cerrado',
        prioridad: 'Baja',
        cliente: 'Cliente 2',
        usuario: 'Usuario 2',
        comentarios: '',
        correo: '',
        direccion: '',
        fechacreacion: '',
        telefono: '',
        tipo: 'incidencia',
        canal: 'web'
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
