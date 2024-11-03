import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RoleService} from '../../services/role.service';
import {RolesPermisosComponent} from './roles-permisos.component';
import {of, throwError} from 'rxjs';
import {Role} from '../../models/role';
import {HttpClientTestingModule} from '@angular/common/http/testing';
// Adjust the path as necessary

describe('RolesPermisosComponent', () => {
  let component: RolesPermisosComponent;
  let fixture: ComponentFixture<RolesPermisosComponent>;
  let roleServiceStub = jasmine.createSpyObj('RoleService', ['getAllRoles']);

  beforeEach(() => {
    roleServiceStub = jasmine.createSpyObj('RoleService', ['getAllRoles', 'createRole', 'getRole', 'actualizarPermisos']);
    TestBed.configureTestingModule({
      imports: [RolesPermisosComponent, HttpClientTestingModule],
      providers: [{provide: RoleService, useFactory: roleServiceStub}]
    });
    fixture = TestBed.createComponent(RolesPermisosComponent);
    component = fixture.componentInstance;
    const mockRoles: [Role, Role] = [
      {id: 1, nombre: 'Admin', permisos: []},
      {id: 2, nombre: 'User', permisos: []}
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
        {id: 1, nombre: 'Admin', permisos: []},
        {id: 2, nombre: 'User', permisos: []}
      ];
      spyOn(roleServiceStub, 'getAllRoles').and.returnValues(of(mockRoles));
      component.getAllRoles();
      expect(roleServiceStub.getAllRoles).toHaveBeenCalled();
    });

    it('getAllRoles updates roles array', () => {
      const mockRoles: [Role, Role] = [
        {id: 1, nombre: 'Admin', permisos: []},
        {id: 2, nombre: 'User', permisos: []}
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
      const mockRoles: Role = {id: 1, nombre: 'Admin', permisos: []};
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
      component.roleForm.setValue({nombre: 'Admin'});
      component.onSubmit();
      expect(component.showToast).toHaveBeenCalledWith('Rol creado exitosamente!', 'success');
      expect(roleServiceStub.createRole).toHaveBeenCalled();
    });

    it('makes expected calls error', () => {
      const roleServiceStub: RoleService = fixture.debugElement.injector.get(RoleService);
      const errorResponse = {error: {message: 'El Role ya existe'}};
      spyOn(roleServiceStub, 'createRole').and.returnValue(throwError(errorResponse));
      spyOn(component, 'showToast').and.callThrough();
      component.roleForm.setValue({nombre: 'Admin'});
      component.onSubmit();
      expect(component.showToast).toHaveBeenCalledWith('El Role ya existe', 'error');
      expect(roleServiceStub.createRole).toHaveBeenCalled();
    });

    it('makes expected calls error 2', () => {
      const roleServiceStub: RoleService = fixture.debugElement.injector.get(RoleService);
      const errorResponse = {error: {}};
      spyOn(roleServiceStub, 'createRole').and.returnValue(throwError(errorResponse));
      spyOn(component, 'showToast').and.callThrough();
      component.roleForm.setValue({nombre: 'Admin'});
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

    it('should fetch role and update permissions correctly', () => {
      const roleServiceStub: RoleService = fixture.debugElement.injector.get(RoleService);
      const mockRoles: Role = {
        id: 1,
        nombre: 'Admin',
        permisos: [
          {id: 1, nombre: 'permiso1'},
          {id: 2, nombre: 'permiso2'},
          {id: 3, nombre: 'permiso3'},
          {id: 4, nombre: 'permiso4'},
          {id: 5, nombre: 'permiso5'}
        ]
      };
      spyOn(roleServiceStub, 'getRole').and.returnValue(of(mockRoles));

      component.getRole(1);

      expect(roleServiceStub.getRole).toHaveBeenCalledWith(1);
      expect(component.role).toEqual(mockRoles);
      expect(component.permisos).toEqual(mockRoles.permisos);
      expect(component.isVisible).toBeTrue();
      expect(component.permiso1).toBeTrue();
      expect(component.permiso2).toBeTrue();
      expect(component.permiso3).toBeTrue();
      expect(component.permiso4).toBeTrue();
      expect(component.permiso5).toBeTrue();
    });

    it('should toggle permiso1 correctly', () => {
      component.permiso1 = false;
      component.cambiarEstadoPermiso('permiso1');
      expect(component.permiso1).toBeTrue();

      component.cambiarEstadoPermiso('permiso1');
      expect(component.permiso1).toBeFalse();
    });

    it('should toggle permiso2 correctly', () => {
      component.permiso2 = false;
      component.cambiarEstadoPermiso('permiso2');
      expect(component.permiso2).toBeTrue();

      component.cambiarEstadoPermiso('permiso2');
      expect(component.permiso2).toBeFalse();
    });

    it('should toggle permiso3 correctly', () => {
      component.permiso3 = false;
      component.cambiarEstadoPermiso('permiso3');
      expect(component.permiso3).toBeTrue();

      component.cambiarEstadoPermiso('permiso3');
      expect(component.permiso3).toBeFalse();
    });

    it('should toggle permiso4 correctly', () => {
      component.permiso4 = false;
      component.cambiarEstadoPermiso('permiso4');
      expect(component.permiso4).toBeTrue();

      component.cambiarEstadoPermiso('permiso4');
      expect(component.permiso4).toBeFalse();
    });

    it('should toggle permiso5 correctly', () => {
      component.permiso5 = false;
      component.cambiarEstadoPermiso('permiso5');
      expect(component.permiso5).toBeTrue();

      component.cambiarEstadoPermiso('permiso5');
      expect(component.permiso5).toBeFalse();
    });
  });
});
