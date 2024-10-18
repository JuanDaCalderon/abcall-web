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
      const permisoStub: Permiso = {} as Permiso;
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

  describe('getRole', () => {
    it('makes expected calls ', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const roleStub: Role = {ID: 1, NOMBRE: 'Admin', PERMISOS: []} as Role;
      service.getRole(1).subscribe((res) => {
        console.log(res);
        expect(res).toEqual(roleStub);
      });
      const req = httpTestingController.expectOne('http://localhost:8002/role/' + 1);
      expect(req.request.method).toEqual('GET');
      req.flush(roleStub);
      httpTestingController.verify();
    });
  });

  describe('associatePermisoToRole', () => {
    it('makes expected calls', () => {
      const httpTestingController = TestBed.inject(HttpTestingController);
      const roleStub: Role = {ID: 1, NOMBRE: 'Admin', PERMISOS: []} as Role;
      const permisoStub: [Permiso] = [
        {ID: 1, NOMBRE: 'crear', ESTADO: true},
        {ID: 2, NOMBRE: 'actualizar', ESTADO: true}
      ] as unknown as [Permiso];
      service.associatePermisoToRole(1, permisoStub).subscribe((res) => {
        console.log(res);
        expect(res).toEqual(roleStub);
      });
      const req = httpTestingController.expectOne('http://localhost:8002/role/' + 1 + '/permiso');
      expect(req.request.method).toEqual('POST');
      req.flush(roleStub);
      httpTestingController.verify();
    });
  });
});
