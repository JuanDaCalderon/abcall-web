import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {PersonalizarTextosComponent} from './personalizar-textos.component';
import {ClienteService} from '../../services/cliente.service';
import {TextosService} from '../../services/textos.service';
import {ToastrService} from 'ngx-toastr';

describe('PersonalizarTextosComponent', () => {
  let component: PersonalizarTextosComponent;
  let fixture: ComponentFixture<PersonalizarTextosComponent>;
  let clienteService: jasmine.SpyObj<ClienteService>;
  let textosService: jasmine.SpyObj<TextosService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const clienteServiceSpy = jasmine.createSpyObj('ClienteService', {
      getUsers: of([])
    });
    const textosServiceSpy = jasmine.createSpyObj('TextosService', {
      getTextos: of([]),
      putTextos: of({}),
      postTextos: of({})
    });
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, PersonalizarTextosComponent],
      providers: [
        {provide: ClienteService, useValue: clienteServiceSpy},
        {provide: TextosService, useValue: textosServiceSpy},
        {provide: ToastrService, useValue: toastrServiceSpy}
      ]
    }).compileComponents();

    clienteService = TestBed.inject(ClienteService) as jasmine.SpyObj<ClienteService>;
    textosService = TestBed.inject(TextosService) as jasmine.SpyObj<TextosService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizarTextosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.textosForm).toBeDefined();
  });

  it('should load the clients', () => {
    expect(clienteService.getUsers).toHaveBeenCalled();
  });

  it('should call getTextos and update form values', () => {
    const mockResponse = {id: 1, saludo: 'Hola', cierre: 'Adiós', clienteid: '123'};
    textosService.getTextos.and.returnValue(of(mockResponse));

    const event = {target: {value: '123'}} as unknown as Event;
    component.getTextos(event);

    expect(textosService.getTextos).toHaveBeenCalledWith('123');
    expect(component.textosForm.get('saludo')?.value).toBe('Hola');
    expect(component.textosForm.get('cierre')?.value).toBe('Adiós');
  });

  it('should call putTextos, show success message, and reset form', () => {
    const mockTextos = {id: 1, saludo: 'Hola', cierre: 'Adiós', clienteid: '123'};
    textosService.putTextos.and.returnValue(of(mockTextos));
    spyOn(component, 'showToast');

    component.textos = {id: 1, saludo: 'Hola', cierre: 'Adiós', clienteid: '123'};

    component.textosForm.setValue({cliente: '123', saludo: 'Hola', cierre: 'Adiós'});
    spyOn(component.textosForm, 'reset');
    component.putTextos();

    expect(textosService.putTextos).toHaveBeenCalledWith({id: 1, clienteid: '123', saludo: 'Hola', cierre: 'Adiós'});
    expect(component.showToast).toHaveBeenCalledWith('Textos actualizados correctamente', 'success');
    expect(component.textosForm.reset).toHaveBeenCalled();
  });

  it('should call postTextos, show success message, and reset form', () => {
    const mockTextos = {id: 1, saludo: 'Hola', cierre: 'Adiós', clienteid: '123'};
    textosService.postTextos.and.returnValue(of(mockTextos));
    spyOn(component, 'showToast');

    component.textos = {id: 1, saludo: 'Hola', cierre: 'Adiós', clienteid: '123'};

    component.textosForm.setValue({cliente: '123', saludo: 'Hola', cierre: 'Adiós'});
    spyOn(component.textosForm, 'reset');
    component.postTextos();

    expect(textosService.postTextos).toHaveBeenCalledWith({id: 1, clienteid: '123', saludo: 'Hola', cierre: 'Adiós'});
    expect(component.showToast).toHaveBeenCalledWith('Textos actualizados correctamente', 'success');
    expect(component.textosForm.reset).toHaveBeenCalled();
  });

  it('should show success message', () => {
    const message = 'Operation successful';
    const type = 'success';
    const configToast = {
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-center'
    };

    component.showToast(message, type);

    expect(toastrService.success).toHaveBeenCalledWith(message, 'Success', configToast);
  });

  it('should show error message', () => {
    const message = 'Operation failed';
    const type = 'error';
    const configToast = {
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-center'
    };

    component.showToast(message, type);

    expect(toastrService.error).toHaveBeenCalledWith(message, 'Error', configToast);
  });

  it('should call putTextos when verifTexto is true', () => {
    spyOn(component, 'putTextos');
    spyOn(component, 'postTextos');

    component.verifTexto = true;
    component.validarTextos();

    expect(component.putTextos).toHaveBeenCalled();
    expect(component.postTextos).not.toHaveBeenCalled();
  });

  it('should call postTextos when verifTexto is false', () => {
    spyOn(component, 'putTextos');
    spyOn(component, 'postTextos');

    component.verifTexto = false;
    component.validarTextos();

    expect(component.postTextos).toHaveBeenCalled();
    expect(component.putTextos).not.toHaveBeenCalled();
  });
});
