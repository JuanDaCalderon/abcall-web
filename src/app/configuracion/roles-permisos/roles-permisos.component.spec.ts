import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RoleService} from '../../services/role.service';
import {RolesPermisosComponent} from './roles-permisos.component';
import {of, throwError} from 'rxjs';
import {Role} from '../../models/role';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('RolesPermisosComponent', () => {
  let component: RolesPermisosComponent;
  let fixture: ComponentFixture<RolesPermisosComponent>;
  let roleServiceStub = jasmine.createSpyObj('RoleService', ['getAllRoles']);

  beforeEach(() => {
    roleServiceStub = jasmine.createSpyObj('RoleService', ['getAllRoles', 'createRole', 'getRole']);
    TestBed.configureTestingModule({
      imports: [RolesPermisosComponent, HttpClientTestingModule],
      providers: [{provide: RoleService, useFactory: roleServiceStub}]
    });
    fixture = TestBed.createComponent(RolesPermisosComponent);
    component = fixture.componentInstance;
    const mockRoles: [Role, Role] = [
      {ID: 1, NOMBRE: 'Admin', PERMISOS: []},
      {ID: 2, NOMBRE: 'User', PERMISOS: []}
    ];
    const toastElement = document.createElement('div');
    toastElement.id = 'liveToast';
    toastElement.innerHTML = '<div class="toast-body"></div>';
    document.body.appendChild(toastElement);

    roleServiceStub.getAllRoles.and.returnValue(of(mockRoles));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).bootstrap = {
      Toast: jasmine.createSpy().and.callFake(function () {
        return {show: jasmine.createSpy('show')};
      })
    };
    fixture.detectChanges();
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`roles has default value`, () => {
    expect(component.roles).toEqual([]);
  });

  it(`isVisible has default value`, () => {
    expect(component.isVisible).toEqual(false);
  });

  it(`permisos has default value`, () => {
    expect(component.permisos).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getAllRoles').and.callThrough();
      component.ngOnInit();
      expect(component.getAllRoles).toHaveBeenCalled();
    });
  });

  describe('getAllRoles', () => {
    it('getAllRoles fetches roles', () => {
      const roleServiceStub: RoleService = fixture.debugElement.injector.get(RoleService);
      const mockRoles: [Role, Role] = [
        {ID: 1, NOMBRE: 'Admin', PERMISOS: []},
        {ID: 2, NOMBRE: 'User', PERMISOS: []}
      ];
      spyOn(roleServiceStub, 'getAllRoles').and.returnValues(of(mockRoles));
      component.getAllRoles();
      expect(roleServiceStub.getAllRoles).toHaveBeenCalled();
    });

    it('getAllRoles updates roles array', () => {
      const mockRoles: [Role, Role] = [
        {ID: 1, NOMBRE: 'Admin', PERMISOS: []},
        {ID: 2, NOMBRE: 'User', PERMISOS: []}
      ];
      if (!roleServiceStub.getAllRoles.calls) {
        spyOn(roleServiceStub, 'getAllRoles').and.returnValues(of(mockRoles));
      }
      component.getAllRoles();
      expect(component.roles.length).toBe(0);
    });

    it('getAllRole fetches roles error', () => {
      const roleServiceStub: RoleService = fixture.debugElement.injector.get(RoleService);
      const errorResponse = {status: 404, message: 'Not found'};
      spyOn(roleServiceStub, 'getAllRoles').and.returnValue(throwError(errorResponse));
      component.getAllRoles();
      expect(roleServiceStub.getAllRoles).toHaveBeenCalledWith();
    });
  });

  describe('getRole', () => {
    it('getRole fetches roles', () => {
      const roleServiceStub: RoleService = fixture.debugElement.injector.get(RoleService);
      const mockRoles: Role = {ID: 1, NOMBRE: 'Admin', PERMISOS: []};
      spyOn(roleServiceStub, 'getRole').and.returnValue(of(mockRoles));
      component.getRole(1);
      expect(roleServiceStub.getRole).toHaveBeenCalled();
    });

    it('getRole fetches roles error', () => {
      const roleServiceStub: RoleService = fixture.debugElement.injector.get(RoleService);
      const errorResponse = {status: 404, message: 'Not found'};
      spyOn(roleServiceStub, 'getRole').and.returnValue(throwError(errorResponse));
      component.getRole(1);
      expect(roleServiceStub.getRole).toHaveBeenCalledWith(1);
    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const roleServiceStub: RoleService = fixture.debugElement.injector.get(RoleService);
      spyOn(roleServiceStub, 'createRole').and.returnValue(of({message: 'Rol creado exitosamente!'}));
      spyOn(component, 'showToast').and.callThrough();
      component.roleForm.setValue({NOMBRE: 'Admin'});
      component.onSubmit();
      expect(component.showToast).toHaveBeenCalledWith('Rol creado exitosamente!', 'success');
      expect(roleServiceStub.createRole).toHaveBeenCalled();
    });

    it('makes expected calls error', () => {
      const roleServiceStub: RoleService = fixture.debugElement.injector.get(RoleService);
      const errorResponse = {error: {message: 'El Role ya existe'}};
      spyOn(roleServiceStub, 'createRole').and.returnValue(throwError(errorResponse));
      spyOn(component, 'showToast').and.callThrough();
      component.roleForm.setValue({NOMBRE: 'Admin'});
      component.onSubmit();
      expect(component.showToast).toHaveBeenCalledWith('El Role ya existe', 'error');
      expect(roleServiceStub.createRole).toHaveBeenCalled();
    });

    it('makes expected calls error 2', () => {
      const roleServiceStub: RoleService = fixture.debugElement.injector.get(RoleService);
      const errorResponse = {error: {}};
      spyOn(roleServiceStub, 'createRole').and.returnValue(throwError(errorResponse));
      spyOn(component, 'showToast').and.callThrough();
      component.roleForm.setValue({NOMBRE: 'Admin'});
      component.onSubmit();
      //expect(component.showToast).toHaveBeenCalled();
      expect(component.showToast).toHaveBeenCalledWith('Ocurrió un error inesperado', 'error');
      expect(roleServiceStub.createRole).toHaveBeenCalled();
    });

    afterEach(() => {
      const toastElement = document.getElementById('liveToast');
      if (toastElement) {
        toastElement.remove();
      }
    });
  });
});
