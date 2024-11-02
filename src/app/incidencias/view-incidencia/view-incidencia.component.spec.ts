import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {ViewIncidenciaComponent} from './view-incidencia.component';
import {IncidenciasService} from '../../services/incidencias.service';
import {CrearIncidenteService} from '../../services/crear-incidente.service';
import {ClienteService} from '../../services/cliente.service';
import {Usuario} from '../../models/usuario';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ViewIncidenciaComponent', () => {
  let component: ViewIncidenciaComponent;
  let fixture: ComponentFixture<ViewIncidenciaComponent>;
  //let incidenciasService: jasmine.SpyObj<IncidenciasService>;
  let clienteService: jasmine.SpyObj<ClienteService>;
  let toastrService: jasmine.SpyObj<ToastrService>;

  /*const mockCliente: Usuario = {
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
  };*/

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
    },
    {
      id: '6',
      email: 'gestorled@gmail.com',
      username: 'gestorled',
      telefono: '999999',
      password: '123456789',
      nombres: 'juan',
      apellidos: 'led',
      direccion: 'Cll 38c No.72j - 55',
      gestortier: 'led',
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

  /* const mockIncidente: Incidente = {
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
  }; */

  beforeEach(async () => {
    const incidenciasServiceSpy = jasmine.createSpyObj('IncidenciasService', ['getIncidencia']);
    const crearIncidenteServiceSpy = jasmine.createSpyObj('CrearIncidenteService', ['crearIncidente']);
    //const updatedIncidenciaSpy = jasmine.createSpyObj('CrearIncidenteService', ['actualizarIncidencia']);
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

  it('should set respuestaIA when descripcionProblema changes', () => {
    component.ngOnInit();
    component.incidentForm.get('descripcionProblema')?.setValue('Test description');
    component.onDescripcionProblemaChange();
    expect(component.incidentForm.get('respuestaIA')?.value).toBe('Respuesta generdada por IA');
  });

  it('should load users by role', () => {
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

  it('should generate time', () => {
    const time = component.generateTime();
    expect(time).toBeDefined();
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

  it('should return new gestor when current gestor is junior', () => {
    component.gestores = mockGestores;
    const newGestor = component.getNewGestor('3'); // '3' is the id of the junior gestor
    expect(newGestor[0]).toBe('4'); // '4' is the id of the mid gestor
    expect(newGestor[1]).toBe('gestormid');
  });

  it('should return new gestor when current gestor is mid', () => {
    component.gestores = mockGestores;
    const newGestor = component.getNewGestor('4'); // '4' is the id of the mid gestor
    expect(newGestor[0]).toBe('5'); // '5' is the id of the senior gestor
    expect(newGestor[1]).toBe('gestorsenior');
  });

  it('should return new gestor when current gestor is senior', () => {
    component.gestores = mockGestores;
    const newGestor = component.getNewGestor('5'); // '4' is the id of the mid gestor

    expect(newGestor[0]).toBe(''); // '7' is the id of the manager gestor
    expect(newGestor[1]).toBe('');
  });

  it('should return new gestor when current gestor is led', () => {
    component.gestores = mockGestores;
    const newGestor = component.getNewGestor('6'); // '6' is the id of the mid gestor

    expect(newGestor[0]).toBe(''); // '7' is the id of the manager gestor
    expect(newGestor[1]).toBe('');
  });

  it('should return "No hay más niveles" when current gestor is manager', () => {
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
