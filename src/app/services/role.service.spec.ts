import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Role} from '../models/role';
import {Permiso} from '../models/permiso';
import {RoleService} from './role.service';

describe('RoleService', () => {
  let service: RoleService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RoleService]
    });
    service = TestBed.inject(RoleService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('createRole', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const roleStub: Role = {ID: 1, NOMBRE: 'Admin', PERMISOS: []} as Role;
      service.createRole(roleStub).subscribe((res) => {
        expect(res).toEqual(roleStub);
      });
      const req = httpTestingController.expectOne('http://localhost:8002/role');
      expect(req.request.method).toEqual('POST');
      req.flush(roleStub);
      httpTestingController.verify();
    });
  });

  describe('crearPermiso', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const permisoStub: Permiso = {} as any;
      service.crearPermiso(permisoStub).subscribe((res) => {
        expect(res).toEqual(permisoStub);
      });
      const req = httpTestingController.expectOne('http://localhost:8002/permiso');
      expect(req.request.method).toEqual('POST');
      req.flush(permisoStub);
      httpTestingController.verify();
    });
  });

  describe('getAllRoles', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      service.getAllRoles().subscribe((res) => {
        expect(res).toEqual([]);
      });
      const req = httpTestingController.expectOne('http://localhost:8002/roles');
      expect(req.request.method).toEqual('GET');
      req.flush([]);
      httpTestingController.verify();
    });
  });
});
