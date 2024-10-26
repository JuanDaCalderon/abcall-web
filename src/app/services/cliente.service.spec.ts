import {TestBed} from '@angular/core/testing';

import {ClienteService} from './cliente.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UsuarioInterface} from '../models/usuario-interface';
import {Usuario} from '../models/usuario';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [ClienteService, TranslateService]
    });
    service = TestBed.inject(ClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createRole', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const clienteStub: UsuarioInterface = {
        id: 1,
        nombres: 'pepito',
        email: 'pepito@perez.com',
        telefono: '888888888',
        direccion: 'calle 1',
        username: 'pepitoperex',
        password: '123456789',
        apellidos: 'perez',
        gestortier: '',
        rol: 2
      } as UsuarioInterface;

      const clienteResponseStub: Usuario = {
        id: 'ee16b59d-0032-4de0-87e5-f3db43be7616',
        email: 'pepito@perez.com',
        username: '123456789',
        password: '123456789',
        nombres: 'pepito',
        apellidos: 'perez',
        telefono: '888888888',
        direccion: 'calle 1',
        gestortier: 'Nivel1',
        token: 'eyJhbG',
        rol: {nombre: 'administrador'}
      } as Usuario;

      service.createCliente(clienteStub).subscribe((res) => {
        expect(res).toEqual(clienteResponseStub);
      });
      const req = httpTestingController.expectOne('http://localhost:8003/usuario/register');
      expect(req.request.method).toEqual('POST');
      req.flush(clienteResponseStub);
      httpTestingController.verify();
    });
  });
});
