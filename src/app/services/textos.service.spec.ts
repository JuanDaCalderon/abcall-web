import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TextosService} from './textos.service';
import {Textos} from '../models/textos';
import {environment} from '../../environments/environment';

describe('TextosService', () => {
  let service: TextosService;
  let httpMock: HttpTestingController;
  const apiUrlTextos = environment.urlApi + environment.portTextos;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TextosService]
    });
    service = TestBed.inject(TextosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch textos by clienteId', () => {
    const dummyTextos: Textos = {id: 1, clienteid: '123', saludo: 'Hola', cierre: 'Adiós'};
    const clienteId = '123';

    service.getTextos(clienteId).subscribe((textos) => {
      expect(textos).toEqual(dummyTextos);
    });

    const req = httpMock.expectOne(`${apiUrlTextos}/texto/cliente/${clienteId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyTextos);
  });

  it('should update textos', () => {
    const dummyTextos: Textos = {id: 1, clienteid: '123', saludo: 'Hola', cierre: 'Adiós'};

    service.putTextos(dummyTextos).subscribe((textos) => {
      expect(textos).toEqual(dummyTextos);
    });

    const req = httpMock.expectOne(`${apiUrlTextos}/texto`);
    expect(req.request.method).toBe('PUT');
    req.flush(dummyTextos);
  });
});
