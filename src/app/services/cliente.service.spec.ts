import {TestBed} from '@angular/core/testing';

import {ClienteService} from './cliente.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Cliente} from '../models/cliente';

describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClienteService]
    });
    service = TestBed.inject(ClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createRole', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const clienteStub: Cliente = {
        id: 1,
        nombre: 'pepito perez',
        email: 'pepito@perez.com',
        telefono: '8888888',
        direccion: 'calle 1'
      } as Cliente;
      service.createCliente(clienteStub).subscribe((res) => {
        expect(res).toEqual(clienteStub);
      });
      const req = httpTestingController.expectOne('http://localhost:8003/usuario/cliente');
      expect(req.request.method).toEqual('POST');
      req.flush(clienteStub);
      httpTestingController.verify();
    });
  });
});
