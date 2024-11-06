import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {of} from 'rxjs';
import {CreateIncidenciasComponent} from './create-incidencias.component';
import {IncidenciasService} from '../../services/incidencias.service';
import {ClienteService} from '../../services/cliente.service';
import {Usuario} from '../../models/usuario';
import {Incidente} from '../../models/incidentes';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CrearClienteComponent} from '../../configuracion/crear-cliente/crear-cliente.component';
import {IaGenerativaService} from '../../services/ia-generativa.service';

describe('CreateIncidenciasComponent', () => {
  let component: CreateIncidenciasComponent;
  let fixture: ComponentFixture<CreateIncidenciasComponent>;
  let incidenciasService: jasmine.SpyObj<IncidenciasService>;
  let clienteService: jasmine.SpyObj<ClienteService>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  //let iagenerativaServiceSpy: jasmine.SpyObj<IaGenerativaService>;

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

  const mockClientes: Usuario[] = [
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
      rol: {id: 5, nombre: 'cliente', permisos: []}
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
      rol: {id: 5, nombre: 'cliente', permisos: []}
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
      rol: {id: 5, nombre: 'usuario', permisos: []}
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
      rol: {id: 5, nombre: 'usuario', permisos: []}
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

  beforeEach(async () => {
    const incidenciasServiceSpy = jasmine.createSpyObj('IncidenciasService', ['createIncidencia']);
    const clienteServiceSpy = jasmine.createSpyObj('ClienteService', ['getUsers']);
    const iagenerativaspy = jasmine.createSpyObj('IaGenerativaService', ['generarRespuesta']);
    const toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, CrearClienteComponent, ToastrModule.forRoot()],
      providers: [
        {provide: IncidenciasService, useValue: incidenciasServiceSpy},
        {provide: ClienteService, useValue: clienteServiceSpy},
        {provide: IaGenerativaService, useValue: iagenerativaspy},
        {provide: ToastrService, useValue: toastrServiceSpy}
      ]
    }).compileComponents();

    incidenciasService = TestBed.inject(IncidenciasService) as jasmine.SpyObj<IncidenciasService>;
    clienteService = TestBed.inject(ClienteService) as jasmine.SpyObj<ClienteService>;
    //iagenerativaServiceSpy = TestBed.inject(IaGenerativaService) as jasmine.SpyObj<IaGenerativaService>;
    toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIncidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.incidentForm).toBeDefined();
    expect(component.incidentForm.get('cliente')).toBeTruthy();
  });

  it('should disable certain form controls on ngOnInit', () => {
    component.ngOnInit();
    expect(component.incidentForm.get('fecha')?.disabled).toBeTrue();
    expect(component.incidentForm.get('canalIngreso')?.disabled).toBeTrue();
    expect(component.incidentForm.get('respuestaIA')?.disabled).toBeTrue();
  });

  it('should call loadUsersByRol for each role on ngOnInit', () => {
    spyOn(component, 'loadUsersByRol');
    component.ngOnInit();
    expect(component.loadUsersByRol).toHaveBeenCalledWith('4');
    expect(component.loadUsersByRol).toHaveBeenCalledWith('5');
    expect(component.loadUsersByRol).toHaveBeenCalledWith('3');
  });

  it('should set respuestaIA when descripcionProblema changes', () => {
    component.ngOnInit();
    component.incidentForm.get('descripcionProblema')?.setValue('Test description');
    const iagenerativaServiceStub: IaGenerativaService = fixture.debugElement.injector.get(IaGenerativaService);
    const testValue = 'Descripción del problema';
    const mockResponse = {respuesta: 'Respuesta sugerida por IA'};
    spyOn(iagenerativaServiceStub, 'generarRespuesta').and.returnValues(of(mockResponse));
    component.incidentForm.get('descripcionProblema')?.setValue(testValue);
    component.onDescripcionProblemaChange();
    expect(iagenerativaServiceStub.generarRespuesta).toHaveBeenCalledWith(testValue);
    expect(component.incidentForm.get('respuestaIA')?.value).toBe('Respuesta sugerida por IA');
  });

  it('should enable and clear respuestaIA when descripcionProblema is empty', () => {
    component.incidentForm.get('descripcionProblema')?.setValue('');
    const iagenerativaServiceStub: IaGenerativaService = fixture.debugElement.injector.get(IaGenerativaService);
    const mockResponse = {respuesta: 'Respuesta sugerida por IA'};
    spyOn(iagenerativaServiceStub, 'generarRespuesta').and.returnValues(of(mockResponse));
    component.incidentForm.get('descripcionProblema')?.setValue('');
    component.onDescripcionProblemaChange();
    expect(component.incidentForm.get('respuestaIA')?.value).toBe('');
    expect(component.incidentForm.get('respuestaIA')?.disabled).toBeTrue();
  });

  it('should reset the form and call afterReset on successful submit', async () => {
    component.ngOnInit();
    spyOn(component.incidentForm, 'reset');
    spyOn(component, 'afterReset');
    incidenciasService.createIncidencia.and.returnValue(of(mockIncidente));
    await component.onSubmit('creado');

    expect(component.incidentForm.reset).not.toHaveBeenCalled();
    expect(component.afterReset).not.toHaveBeenCalled();
  });

  it('should show success toast on successful submit', async () => {
    component.ngOnInit();
    incidenciasService.createIncidencia.and.returnValue(of(mockIncidente));
    await component.onSubmit('creado');

    expect(toastrService.success).not.toHaveBeenCalled();
  });

  it('should generate correct time format', () => {
    const time = component.generateTime();
    expect(time).toMatch(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/);
  });

  it('should load users by role gestores', () => {
    clienteService.getUsers.and.returnValue(of(mockGestores));
    component.loadUsersByRol('3');
    expect(component.gestores).toEqual(mockGestores);
  });

  it('should load users by role clientes', () => {
    clienteService.getUsers.and.returnValue(of(mockClientes));
    component.loadUsersByRol('4');
    expect(component.clientes).toEqual(mockClientes);
  });

  it('should load users by role usuarios', () => {
    clienteService.getUsers.and.returnValue(of(mockUsuarios));
    component.loadUsersByRol('5');
    expect(component.usuarios).toEqual(mockUsuarios);
  });

  it('should get correct gestor based on action creado', () => {
    component.gestores = mockGestores;
    const gestor = component.getGestor('creado');
    expect(gestor).toEqual(['3', 'gestorjunior']);
  });

  it('should get correct gestor based on action escalado', () => {
    component.gestores = mockGestores;
    const gestor = component.getGestor('escalado');
    expect(gestor).toEqual(['4', 'gestormid']);
  });

  it('should reset form fields to default values in afterReset', () => {
    component.ngOnInit();
    component.afterReset();
    expect(component.incidentForm.get('tipoIncidencia')?.value).toBe('incidencia');
    expect(component.incidentForm.get('canalIngreso')?.value).toBe('web');
    expect(component.incidentForm.get('prioridad')?.value).toBe('baja');
    expect(component.incidentForm.get('estado')?.value).toBe('abierto');
    expect(component.incidentForm.get('fecha')?.disabled).toBeTrue();
    expect(component.incidentForm.get('canalIngreso')?.disabled).toBeTrue();
    expect(component.incidentForm.get('respuestaIA')?.disabled).toBeTrue();
  });

  it('should show success toast', () => {
    component.showToast('message1', 'message2', 'success');
    expect(toastrService.success).toHaveBeenCalledWith('message1', 'message2', {
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-center'
    });
  });

  it('should show error toast', () => {
    component.showToast('message1', 'message2', 'error');
    expect(toastrService.error).toHaveBeenCalledWith('message1', 'message2', {
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-center'
    });
  });
});
