import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {of, throwError} from 'rxjs';
import {CreateIncidenciasComponent} from './create-incidencias.component';
import {CrearIncidenteService} from '../../services/crear-incidente.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CrearClienteComponent} from '../../configuracion/crear-cliente/crear-cliente.component';
import {Incidente} from '../../models/incidentes';
import {ClienteService} from '../../services/cliente.service';
import {Usuario} from '../../models/usuario';

describe('CreateIncidenciasComponent', () => {
  let component: CreateIncidenciasComponent;
  let fixture: ComponentFixture<CreateIncidenciasComponent>;
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

  const mockGestores: Usuario[] = [
    {
      id: '3',
      email: 'gestorjunior@gmail.com',
      username: 'gestorjunior',
      telefono: '6666666666',
      password: '123456789',
      nombres: 'gestorjunior',
      apellidos: 'gestorjunior',
      direccion: 'Cll 38c No.72j - 55',
      gestortier: 'junior',
      token: 'token',
      rol: {id: 3, nombre: 'gestor', permisos: []}
    },
    {
      id: '4',
      email: 'gestormid@gmail.com',
      username: 'gestormid',
      telefono: '77777777',
      password: '123456789',
      nombres: 'gestormid',
      apellidos: 'gestormid',
      direccion: 'Cll 38c No.72j - 55',
      gestortier: 'mid',
      token: 'token',
      rol: {id: 3, nombre: 'gestor', permisos: []}
    },
    {
      id: '5',
      email: 'gestorsenior@gmail.com',
      username: 'gestorsenior',
      telefono: '999999',
      password: '123456789',
      nombres: 'juan',
      apellidos: 'senior',
      direccion: 'Cll 38c No.72j - 55',
      gestortier: 'senior',
      token: 'token',
      rol: {id: 3, nombre: 'gestor', permisos: []}
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
    tipo: 'incidencia',
    gestor: mockGestores[0]
  };

  const mockUsers: Usuario[] = [
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

  beforeEach(async () => {
    const crearIncidenteServiceSpy = jasmine.createSpyObj('CrearIncidenteService', ['crearIncidente']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, CrearClienteComponent, ToastrModule.forRoot()],
      providers: [
        {provide: CrearIncidenteService, useValue: crearIncidenteServiceSpy},
        {provide: ToastrService, useValue: toastrServiceSpy}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateIncidenciasComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should initialize the form with default values', () => {
    const form = component.incidentForm;
    expect(form).toBeDefined();
    expect(form.get('cliente')?.value).toBe('');
    expect(form.get('nombreUsuario')?.value).toBe('');
    expect(form.get('telefonoUsuario')?.value).toBe('');
    expect(form.get('correoUsuario')?.value).toBe('');
    expect(form.get('direccionUsuario')?.value).toBe('');
    expect(form.get('descripcionProblema')?.value).toBe('');
    expect(form.get('tipoIncidencia')?.value).toBe('incidencia');
    expect(form.get('canalIngreso')?.value).toBe('web');
    expect(form.get('prioridad')?.value).toBe('baja');
    expect(form.get('estado')?.value).toBe('abierto');
    expect(form.get('respuestaIA')?.value).toBe('');
  });

  fit('should disable certain form controls on initialization', () => {
    const form = component.incidentForm;
    expect(form.get('fecha')?.disabled).toBeTrue();
    expect(form.get('canalIngreso')?.disabled).toBeTrue();
    expect(form.get('respuestaIA')?.disabled).toBeTrue();
  });

  it('should handle error during incident creation', () => {
    const CrearIncidenteServiceStub: CrearIncidenteService = fixture.debugElement.injector.get(CrearIncidenteService);
    const errorResponse = {error: {message: 'Incidente no creado'}};
    spyOn(CrearIncidenteServiceStub, 'crearIncidente').and.returnValue(throwError(errorResponse));
    component.onSubmit('creado');

    expect(toastrService.error).toHaveBeenCalled();
  });

  fit('should handle success during incident creation', () => {
    const CrearIncidenteServiceStub: CrearIncidenteService = fixture.debugElement.injector.get(CrearIncidenteService);
    spyOn(CrearIncidenteServiceStub, 'crearIncidente').and.returnValue(of(mockIncidente));
    component.onSubmit('creado');

    expect(toastrService.success).toHaveBeenCalled();
  });

  it('should handle error during incident escalation', () => {
    const CrearIncidenteServiceStub: CrearIncidenteService = fixture.debugElement.injector.get(CrearIncidenteService);
    const errorResponse = {error: {message: 'Incidente no creado'}};
    spyOn(CrearIncidenteServiceStub, 'crearIncidente').and.returnValue(throwError(errorResponse));
    component.onSubmit('escalado');

    expect(toastrService.error).toHaveBeenCalled();
  });

  it('should handle success during incident creation', () => {
    const CrearIncidenteServiceStub: CrearIncidenteService = fixture.debugElement.injector.get(CrearIncidenteService);
    spyOn(CrearIncidenteServiceStub, 'crearIncidente').and.returnValue(of(mockIncidente));
    component.onSubmit('escalado');

    expect(toastrService.success).toHaveBeenCalled();
  });

  it('should reset form on afterReset', () => {
    component.afterReset();
    expect(component.incidentForm.get('tipoIncidencia')?.value).toBe('incidencia');
    expect(component.incidentForm.get('canalIngreso')?.value).toBe('web');
    expect(component.incidentForm.get('prioridad')?.value).toBe('baja');
    expect(component.incidentForm.get('estado')?.value).toBe('abierto');
  });

  it('should enable and set respuestaIA when descripcionProblema changes', () => {
    component.incidentForm.get('descripcionProblema')?.setValue('Test description');
    component.onDescripcionProblemaChange();
    expect(component.incidentForm.get('respuestaIA')?.value).toBe('Respuesta generdada por IA');
    expect(component.incidentForm.get('respuestaIA')?.disabled).toBeTrue();
  });

  it('should enable and clear respuestaIA when descripcionProblema is empty', () => {
    component.incidentForm.get('descripcionProblema')?.setValue('');
    component.onDescripcionProblemaChange();
    expect(component.incidentForm.get('respuestaIA')?.value).toBe('');
    expect(component.incidentForm.get('respuestaIA')?.disabled).toBeTrue();
  });

  it('should load users by role 4 and set clientes', () => {
    const clienteServiceStub = fixture.debugElement.injector.get(ClienteService);
    spyOn(clienteServiceStub, 'getUsers').and.returnValue(of(mockUsers));

    component.loadUsersByRol('4');

    expect(clienteServiceStub.getUsers).toHaveBeenCalledWith('4');
    expect(component.clientes).toEqual(mockUsers);
  });

  it('should load users by role 5 and set usuarios', () => {
    const clienteServiceStub = fixture.debugElement.injector.get(ClienteService);
    spyOn(clienteServiceStub, 'getUsers').and.returnValue(of(mockUsers));

    component.loadUsersByRol('5');

    expect(clienteServiceStub.getUsers).toHaveBeenCalledWith('5');
    expect(component.usuarios).toEqual(mockUsers);
  });

  it('should handle error when loading users by role 4', () => {
    const errorResponse = {error: {message: 'Error al cargar clientes'}};
    const clienteServiceStub = fixture.debugElement.injector.get(ClienteService);
    spyOn(clienteServiceStub, 'getUsers').and.returnValue(throwError(errorResponse));

    component.loadUsersByRol('4');

    expect(clienteServiceStub.getUsers).toHaveBeenCalledWith('4');
    expect(toastrService.error).toHaveBeenCalledWith('Error al cargar clientes', 'Error', {
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-center'
    });
  });

  it('should handle error when loading users by role 5', () => {
    const errorResponse = {error: {message: 'Error al cargar usuarios'}};
    const clienteServiceStub = fixture.debugElement.injector.get(ClienteService);
    spyOn(clienteServiceStub, 'getUsers').and.returnValue(throwError(errorResponse));

    component.loadUsersByRol('5');

    expect(clienteServiceStub.getUsers).toHaveBeenCalledWith('5');
    expect(toastrService.error).toHaveBeenCalledWith('Error al cargar usuarios', 'Error', {
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-center'
    });
  });
});
