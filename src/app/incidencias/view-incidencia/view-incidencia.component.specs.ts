import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {of, throwError} from 'rxjs';
import {ViewIncidenciaComponent} from './view-incidencia.component';
import {IncidenciasService} from '../../services/incidencias.service';
import {CrearIncidenteService} from '../../services/crear-incidente.service';
import {ClienteService} from '../../services/cliente.service';
import {Usuario} from '../../models/usuario';
import {Incidente} from '../../models/incidentes';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ViewIncidenciaComponent', () => {
  let component: ViewIncidenciaComponent;
  let fixture: ComponentFixture<ViewIncidenciaComponent>;
  let incidenciasService: jasmine.SpyObj<IncidenciasService>;
  let clienteService: jasmine.SpyObj<ClienteService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  const mockCliente: Usuario = {
    id: '1',
    email: 'cliente1@prueba.com',
    username: 'cliente1',
    password: '123456789',
    nombres: 'cliente',
    apellidos: 'uno',
    telefono: '300123456789',
    direccion: 'calle 123',
    gestortier: '',
    token: 'token',
    rol: {id: 4, nombre: 'cliente', permisos: []}
  };

  const mockUsuarios: Usuario[] = [
    {
      id: '1',
      nombres: 'User 1',
      email: 'user1@example.com',
      telefono: '1234567890',
      direccion: 'Address 1',
      username: 'user1',
      password: 'password1',
      apellidos: 'Lastname 1',
      gestortier: '',
      token: 'token',
      rol: {id: 4, nombre: 'cliente', permisos: []}
    },
    {
      id: '2',
      nombres: 'User 2',
      email: 'user2@example.com',
      telefono: '0987654321',
      direccion: 'Address 2',
      username: 'user2',
      password: 'password2',
      apellidos: 'Lastname 2',
      gestortier: '',
      token: 'token',
      rol: {id: 4, nombre: 'cliente', permisos: []}
    }
  ];

  const mockIncidente: Incidente = {
    id: 1,
    cliente: mockCliente,
    fechacreacion: '2023-10-01',
    usuario: mockUsuarios[0],
    correo: 'prueba@prueba.com',
    direccion: 'Test address',
    telefono: '123456789',
    descripcion: 'Test description',
    prioridad: 'baja',
    estado: 'abierto',
    comentarios: 'Test comments',
    canal: 'web',
    tipo: 'incidencia'
  };

  beforeEach(async () => {
    const incidenciasServiceSpy = jasmine.createSpyObj('IncidenciasService', ['getIncidencia']);
    const crearIncidenteServiceSpy = jasmine.createSpyObj('CrearIncidenteService', ['crearIncidente']);
    const clienteServiceSpy = jasmine.createSpyObj('ClienteService', ['getUsers']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        {provide: IncidenciasService, useValue: incidenciasServiceSpy},
        {provide: CrearIncidenteService, useValue: crearIncidenteServiceSpy},
        {provide: ClienteService, useValue: clienteServiceSpy},
        {provide: ToastrService, useValue: toastrServiceSpy},
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: '123'})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewIncidenciaComponent);
    component = fixture.componentInstance;
    incidenciasService = TestBed.inject(IncidenciasService) as jasmine.SpyObj<IncidenciasService>;
    clienteService = TestBed.inject(ClienteService) as jasmine.SpyObj<ClienteService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.incidentForm).toBeDefined();
    expect(component.incidentForm.get('cliente')).toBeTruthy();
  });

  it('should load incident on ngOnInit', () => {
    incidenciasService.getIncidenciaById.and.returnValue(of(mockIncidente));
    component.ngOnInit();
    expect(component.incidentForm.get('estado')?.value).toEqual('');
  });

  it('should enable and disable respuestaIA based on descripcionProblema', () => {
    component.ngOnInit();
    component.incidentForm.get('descripcionProblema')?.setValue('Test description');
    component.onDescripcionProblemaChange();
    expect(component.incidentForm.get('respuestaIA')?.value).toEqual('Respuesta generdada por IA');
    expect(component.incidentForm.get('respuestaIA')?.disabled).toBeTrue();

    component.incidentForm.get('descripcionProblema')?.setValue('');
    component.onDescripcionProblemaChange();
    expect(component.incidentForm.get('respuestaIA')?.value).toEqual('');
    expect(component.incidentForm.get('respuestaIA')?.disabled).toBeTrue();
  });

  it('should load users by role', () => {
    clienteService.getUsers.and.returnValue(of(mockUsuarios));

    component.loadUsersByRol('4');
    expect(clienteService.getUsers).toHaveBeenCalledWith('4');
    expect(component.clientes).toEqual(mockUsuarios);

    component.loadUsersByRol('5');
    expect(clienteService.getUsers).toHaveBeenCalledWith('5');
    expect(component.usuarios).toEqual(mockUsuarios);
  });

  it('should handle error when loading users by role', () => {
    clienteService.getUsers.and.returnValue(throwError('Error'));

    component.loadUsersByRol('4');
    expect(clienteService.getUsers).toHaveBeenCalledWith('4');
    expect(toastrService.error).toHaveBeenCalledWith('Error al cargar clientes', 'Error', {
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-center'
    });

    component.loadUsersByRol('5');
    expect(clienteService.getUsers).toHaveBeenCalledWith('5');
    expect(toastrService.error).toHaveBeenCalledWith('Error al cargar usuarios', 'Error', {
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-center'
    });
  });

  it('should generate time', () => {
    const time = component.generateTime();
    expect(time).toBeDefined();
  });
});
