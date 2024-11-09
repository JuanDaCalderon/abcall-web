import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthService} from '../../services/auth.service';
import {ViewIncidenciaComponent} from './view-incidencia.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {RouterTestingModule} from '@angular/router/testing';
import {Usuario} from '../../models/usuario';
import {of} from 'rxjs';
import {ClienteService} from '../../services/cliente.service';

describe('ViewIncidenciaComponent', () => {
  let component: ViewIncidenciaComponent;
  let fixture: ComponentFixture<ViewIncidenciaComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let clienteService: jasmine.SpyObj<ClienteService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  //Mocks
  /*const mockClientes: Usuario[] = [
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
  ];*/

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
    },
    {
      id: '6',
      email: 'gestorled@gmail.com',
      username: 'gestorlead',
      telefono: '999999',
      password: '123456789',
      nombres: 'juan',
      apellidos: 'led',
      direccion: 'Cll 38c No.72j - 55',
      gestortier: 'lead',
      token: 'token',
      rol: {id: 3, nombre: 'gestor', permisos: []}
    },
    {
      id: '7',
      email: 'gestormanager@gmail.com',
      username: 'gestormanager',
      telefono: '999999',
      password: '123456789',
      nombres: 'juan',
      apellidos: 'senior',
      direccion: 'Cll 38c No.72j - 55',
      gestortier: 'manager',
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

  /*const mockIncidente: Incidente = {
    id: 1,
    cliente: mockClientes[0],
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
  };*/

  beforeEach(async () => {
    // creacion spies
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUsuario']);
    clienteService = jasmine.createSpyObj('ClienteService', ['getUsers']);
    toastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    //declaration, imports and providers
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ViewIncidenciaComponent, RouterTestingModule, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: ClienteService, useValue: clienteService},
        {provide: ToastrService, useValue: toastrService},
        ViewIncidenciaComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewIncidenciaComponent);
    component = fixture.componentInstance;

    localStorage.setItem('usuario', JSON.stringify({rol: {nombre: 'usuario'}}));
    const storedUsuario = localStorage.getItem('usuario');
    component.usuario = storedUsuario ? JSON.parse(storedUsuario) : null;

    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.usuario.rol.nombre).toEqual('usuario');
    expect(component.incidentForm).toBeDefined();
    expect(component.incidentForm.get('cliente')).toBeTruthy();
  });

  fit('should set respuestaIA when descripcionProblema changes', () => {
    component.ngOnInit();
    component.incidentForm.get('descripcionProblema')?.setValue('Test description');
    component.onDescripcionProblemaChange();
    expect(component.incidentForm.get('respuestaIA')?.value).toBe('Respuesta generdada por IA');
  });

  fit('should enable and clear respuestaIA when descripcionProblema is empty', () => {
    component.ngOnInit();
    component.incidentForm.get('descripcionProblema')?.setValue('');
    component.onDescripcionProblemaChange();
    expect(component.incidentForm.get('respuestaIA')?.value).toBe('');
    expect(component.incidentForm.get('respuestaIA')?.disabled).toBeTrue();
  });

  fit('should load users by role', () => {
    clienteService.getUsers.and.returnValue(of(mockUsuarios));

    component.loadUsersByRol('3');
    expect(clienteService.getUsers).toHaveBeenCalledWith('3');
    expect(component.gestores).toEqual(mockUsuarios);

    component.loadUsersByRol('4');
    expect(clienteService.getUsers).toHaveBeenCalledWith('4');
    expect(component.clientes).toEqual(mockUsuarios);

    component.loadUsersByRol('5');
    expect(clienteService.getUsers).toHaveBeenCalledWith('5');
    expect(component.usuarios).toEqual(mockUsuarios);
  });

  fit('should generate time', () => {
    const time = component.generateTime();
    expect(time).toBeDefined();
  });

  fit('should show success toast', () => {
    component.showToast('message1', 'message2', 'success');
    expect(toastrService.success).toHaveBeenCalledWith('message1', 'message2', {
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-center'
    });
  });

  fit('should show error toast', () => {
    component.showToast('message1', 'message2', 'error');
    expect(toastrService.error).toHaveBeenCalledWith('message1', 'message2', {
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-center'
    });
  });

  fit('should return new gestor when current gestor is junior', () => {
    component.gestores = mockGestores;
    const newGestor = component.getNewGestor('3'); // '3' is the id of the junior gestor
    expect(newGestor[0]).toBe('4'); // '4' is the id of the mid gestor
    expect(newGestor[1]).toBe('gestormid');
  });

  fit('should return new gestor when current gestor is mid', () => {
    component.gestores = mockGestores;
    const newGestor = component.getNewGestor('4'); // '4' is the id of the mid gestor
    expect(newGestor[0]).toBe('5'); // '5' is the id of the senior gestor
    expect(newGestor[1]).toBe('gestorsenior');
  });

  fit('should return new gestor when current gestor is senior', () => {
    component.gestores = mockGestores;
    const newGestor = component.getNewGestor('5'); // '4' is the id of the mid gestor

    expect(newGestor[0]).toBe('6'); // '7' is the id of the manager gestor
    expect(newGestor[1]).toBe('gestorlead');
  });

  fit('should return new gestor when current gestor is led', () => {
    component.gestores = mockGestores;
    const newGestor = component.getNewGestor('6'); // '6' is the id of the mid gestor

    expect(newGestor[0]).toBe('7'); // '7' is the id of the manager gestor
    expect(newGestor[1]).toBe('gestormanager');
  });

  fit('should return "No hay más niveles" when current gestor is manager', () => {
    const mockManager: Usuario = {
      id: '6',
      email: 'gestormanager@gmail.com',
      username: 'gestormanager',
      telefono: '1111111111',
      password: '123456789',
      nombres: 'gestormanager',
      apellidos: 'gestormanager',
      direccion: 'Cll 38c No.72j - 55',
      gestortier: 'manager',
      token: 'token',
      rol: {id: 3, nombre: 'gestor', permisos: []}
    };
    component.gestores = [...mockGestores, mockManager];
    const newGestor = component.getNewGestor('6'); // '6' is the id of the manager gestor
    expect(newGestor[0]).toBe('No hay más niveles');
    expect(newGestor[1]).toBe('No hay más niveles');
  });
});
