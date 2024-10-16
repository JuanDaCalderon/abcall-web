import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CrearClienteComponent} from './crear-cliente.component';
import {ClienteService} from '../../services/cliente.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {Cliente} from '../../models/cliente';

describe('CrearClienteComponent', () => {
  let component: CrearClienteComponent;
  let fixture: ComponentFixture<CrearClienteComponent>;
  let clienteServiceStub = jasmine.createSpyObj('ClienteService', ['createCliente']);

  beforeEach(async () => {
    clienteServiceStub = jasmine.createSpyObj('ClienteService', ['createCliente']);
    await TestBed.configureTestingModule({
      imports: [CrearClienteComponent, HttpClientTestingModule],
      providers: [{provide: ClienteService, useFactory: clienteServiceStub}]
    }).compileComponents();
    const mockCliente: Cliente = {id: 1, nombre: 'pepito perez', email: 'pepito@perez.com', telefono: '8888888', direccion: 'calle 1'};
    fixture = TestBed.createComponent(CrearClienteComponent);
    component = fixture.componentInstance;
    clienteServiceStub.createCliente.and.returnValue(of(mockCliente));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
