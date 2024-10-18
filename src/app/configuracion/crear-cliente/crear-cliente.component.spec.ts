import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CrearClienteComponent} from './crear-cliente.component';
import {ClienteService} from '../../services/cliente.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of, throwError} from 'rxjs';
import {UsuarioInterface} from '../../models/usuario-interface';

describe('CrearClienteComponent', () => {
  let component: CrearClienteComponent;
  let fixture: ComponentFixture<CrearClienteComponent>;
  let clienteServiceStub = jasmine.createSpyObj('ClienteService', ['createCliente']);

  beforeEach(async () => {
    clienteServiceStub = jasmine.createSpyObj('ClienteService', ['createCliente']);
    await TestBed.configureTestingModule({
      imports: [CrearClienteComponent, HttpClientTestingModule],
      providers: [{provide: ClienteService, useValue: clienteServiceStub}]
    }).compileComponents();
    fixture = TestBed.createComponent(CrearClienteComponent);
    component = fixture.componentInstance;
    const mockCliente: UsuarioInterface = {
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
    };
    clienteServiceStub.createCliente.and.returnValue(of(mockCliente));

    const toastElement = document.createElement('div');
    toastElement.id = 'liveToast';
    toastElement.innerHTML = '<div class="toast-body"></div>';
    document.body.appendChild(toastElement);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).bootstrap = {
      Toast: jasmine.createSpy().and.callFake(function () {
        return {show: jasmine.createSpy('show')};
      })
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      //const clienteServiceStub: ClienteService = fixture.debugElement.injector.get(ClienteService);
      spyOn(component, 'showToast').and.callThrough();
      component.clientForm.setValue({
        nombres: 'pepito',
        email: 'pepito@perez.com',
        telefono: '888888888',
        direccion: 'calle 1',
        apellidos: 'perez'
      });
      component.onSubmit();
      expect(component.showToast).toHaveBeenCalledWith('Cliente creado exitosamente!', 'success');
      expect(clienteServiceStub.createCliente).toHaveBeenCalled();
    });

    it('makes expected calls error', () => {
      const errorResponse = {error: {message: 'El Cliente ya existe'}};
      clienteServiceStub.createCliente.and.returnValue(throwError(errorResponse));
      spyOn(component, 'showToast').and.callThrough();
      component.clientForm.setValue({
        nombres: 'pepito',
        apellidos: 'perez',
        email: 'pepito@perez.com',
        telefono: '88888888',
        direccion: 'calle 2 #5-78'
      });
      component.onSubmit();
      expect(component.showToast).toHaveBeenCalledWith('El Cliente ya existe', 'error');
      expect(clienteServiceStub.createCliente).toHaveBeenCalled();
    });

    it('makes expected calls error 2', () => {
      const errorResponse = {error: {}};
      clienteServiceStub.createCliente.and.returnValue(throwError(errorResponse));
      spyOn(component, 'showToast').and.callThrough();
      component.clientForm.setValue({
        nombres: 'pepito',
        apellidos: 'perez',
        email: 'pepito@perez.com',
        telefono: '88888888',
        direccion: 'calle 2 #5-78'
      });
      component.onSubmit();
      expect(component.showToast).toHaveBeenCalledWith('Ocurrió un error inesperado', 'error');
      expect(clienteServiceStub.createCliente).toHaveBeenCalled();
    });

    afterEach(() => {
      const toastElement = document.getElementById('liveToast');
      if (toastElement) {
        toastElement.remove();
      }
    });
  });
});
