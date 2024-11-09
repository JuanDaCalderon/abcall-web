import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthService} from '../../services/auth.service';
import {ViewIncidenciaComponent} from './view-incidencia.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {RouterTestingModule} from '@angular/router/testing';
import {Usuario} from '../../models/usuario';
import {of} from 'rxjs';
import {ClienteService} from '../../services/cliente.service';
import {IncidenciasService} from '../../services/incidencias.service';
import {Incidente} from '../../models/incidentes';
import {ActivatedRoute} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

describe('ViewIncidenciaComponent', () => {
  let component: ViewIncidenciaComponent;
  let fixture: ComponentFixture<ViewIncidenciaComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let clienteServiceSpy: jasmine.SpyObj<ClienteService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let incidenciasServiceSpy: jasmine.SpyObj<IncidenciasService>;

  //Mocks
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

  const mockIncidente: Incidente = {
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
  };

  beforeEach(async () => {
    // creacion spies
    authServiceSpy = jasmine.createSpyObj('AuthService', ['getUsuario']);
    clienteServiceSpy = jasmine.createSpyObj('ClienteService', ['getUsers']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    incidenciasServiceSpy = jasmine.createSpyObj('IncidenciasService', ['getIncidenciaById', 'updateIncidencia']);

    //declaration, imports and providers
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ViewIncidenciaComponent, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: ClienteService, useValue: clienteServiceSpy},
        {provide: ToastrService, useValue: toastrServiceSpy},
        {provide: IncidenciasService, useValue: incidenciasServiceSpy},
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: '1'})
          }
        },
        ViewIncidenciaComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewIncidenciaComponent);
    component = fixture.componentInstance;

    incidenciasServiceSpy.getIncidenciaById.and.returnValue(of(mockIncidente));
    localStorage.setItem('usuario', JSON.stringify({rol: {nombre: 'usuario'}}));
    const storedUsuario = localStorage.getItem('usuario');
    component.usuario = storedUsuario ? JSON.parse(storedUsuario) : null;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.usuario.rol.nombre).toEqual('usuario');
    expect(component.incidentForm).toBeDefined();
    expect(component.incidentForm.get('cliente')).toBeTruthy();
  });

  it('should set respuestaIA when descripcionProblema changes', () => {
    component.ngOnInit();
    component.incidentForm.get('descripcionProblema')?.setValue('Test description');
    component.onDescripcionProblemaChange();
    expect(component.incidentForm.get('respuestaIA')?.value).toBe('Respuesta generdada por IA');
  });

  it('should enable and clear respuestaIA when descripcionProblema is empty', () => {
    component.ngOnInit();
    component.incidentForm.get('descripcionProblema')?.setValue('');
    component.onDescripcionProblemaChange();
    expect(component.incidentForm.get('respuestaIA')?.value).toBe('');
    expect(component.incidentForm.get('respuestaIA')?.disabled).toBeTrue();
  });

  it('should load users by role', () => {
    clienteServiceSpy.getUsers.and.returnValue(of(mockUsuarios));

    component.loadUsersByRol('3');
    expect(clienteServiceSpy.getUsers).toHaveBeenCalledWith('3');
    expect(component.gestores).toEqual(mockUsuarios);

    component.loadUsersByRol('4');
    expect(clienteServiceSpy.getUsers).toHaveBeenCalledWith('4');
    expect(component.clientes).toEqual(mockUsuarios);

    component.loadUsersByRol('5');
    expect(clienteServiceSpy.getUsers).toHaveBeenCalledWith('5');
    expect(component.usuarios).toEqual(mockUsuarios);
  });

  it('should generate time', () => {
    const time = component.generateTime();
    expect(time).toBeDefined();
  });

  it('should show success toast', () => {
    component.showToast('message1', 'message2', 'success');
    expect(toastrServiceSpy.success).toHaveBeenCalledWith('message1', 'message2', {
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-center'
    });
  });

  it('should show error toast', () => {
    component.showToast('message1', 'message2', 'error');
    expect(toastrServiceSpy.error).toHaveBeenCalledWith('message1', 'message2', {
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

    expect(newGestor[0]).toBe('6'); // '7' is the id of the manager gestor
    expect(newGestor[1]).toBe('gestorlead');
  });

  it('should return new gestor when current gestor is led', () => {
    component.gestores = mockGestores;
    const newGestor = component.getNewGestor('6'); // '6' is the id of the mid gestor

    expect(newGestor[0]).toBe('7'); // '7' is the id of the manager gestor
    expect(newGestor[1]).toBe('gestormanager');
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

  it('should load incident info in form', () => {
    component.loadInfoInForm(mockIncidente);
    expect(component.incidentForm.get('cliente')?.value).toBe(mockIncidente.cliente.id);
    expect(component.incidentForm.get('fecha')?.value).toBe(mockIncidente.fechacreacion);
    expect(component.incidentForm.get('nombreUsuario')?.value).toBe(mockIncidente.usuario.id);
    expect(component.incidentForm.get('correoUsuario')?.value).toBe(mockIncidente.correo);
    expect(component.incidentForm.get('telefonoUsuario')?.value).toBe(mockIncidente.telefono);
    expect(component.incidentForm.get('direccionUsuario')?.value).toBe(mockIncidente.direccion);
    expect(component.incidentForm.get('descripcionProblema')?.value).toBe(mockIncidente.descripcion);
    expect(component.incidentForm.get('tipoIncidencia')?.value).toBe(mockIncidente.tipo);
    expect(component.incidentForm.get('canalIngreso')?.value).toBe(mockIncidente.canal);
    expect(component.incidentForm.get('prioridad')?.value).toBe(mockIncidente.prioridad);
    expect(component.incidentForm.get('estado')?.value).toBe(mockIncidente.estado);
    expect(component.incidentForm.get('comentarios')?.value).toBe(mockIncidente.comentarios);
  });

  it('should call updateIncident with correct data when onSubmit is called with "cerrado"', () => {
    component.ngOnInit();
    component.incidentForm.patchValue({
      cliente: '1',
      nombreUsuario: 'User 1',
      correoUsuario: 'user1@example.com',
      direccionUsuario: 'Address 1',
      telefonoUsuario: '1234567890',
      descripcionProblema: 'Test description',
      prioridad: 'alta',
      estado: 'abierto',
      tipoIncidencia: 'tipo1',
      nuevoComentario: 'Nuevo comentario'
    });

    component.currentGestorId = '3';
    component.currentGestorObj = mockGestores[0];

    const expectedUpdatedIncident = {
      cliente: '1',
      usuario: 'User 1',
      correo: 'user1@example.com',
      direccion: 'Address 1',
      telefono: '1234567890',
      descripcion: 'Test description',
      prioridad: 'alta',
      estado: 'cerrado',
      canal: 'web',
      tipo: 'tipo1',
      comentarios: jasmine.any(String),
      gestor: '3'
    };

    spyOn(component, 'generateTime').and.returnValue('2023-10-01 12:00:00');
    spyOn(component, 'updateIncident');

    component.onSubmit('cerrado');

    expect(component.updateIncident).toHaveBeenCalledWith('1', expectedUpdatedIncident);
  });

  it('should call updateIncident with correct data when onSubmit is called with "escalado"', () => {
    component.ngOnInit();
    component.incidentForm.patchValue({
      cliente: '1',
      nombreUsuario: 'User 1',
      correoUsuario: 'user1@example.com',
      direccionUsuario: 'Address 1',
      telefonoUsuario: '1234567890',
      descripcionProblema: 'Test description',
      prioridad: 'alta',
      estado: 'abierto',
      tipoIncidencia: 'tipo1',
      nuevoComentario: 'Nuevo comentario'
    });

    component.currentGestorId = '3';
    component.currentGestorObj = mockGestores[0];

    const expectedUpdatedIncident = {
      cliente: '1',
      usuario: 'User 1',
      correo: 'user1@example.com',
      direccion: 'Address 1',
      telefono: '1234567890',
      descripcion: 'Test description',
      prioridad: 'alta',
      estado: 'abierto',
      canal: 'web',
      tipo: 'tipo1',
      comentarios: jasmine.any(String),
      gestor: '4'
    };

    spyOn(component, 'generateTime').and.returnValue('2023-10-01 12:00:00');
    spyOn(component, 'updateIncident');
    spyOn(component, 'getNewGestor').and.returnValue(['4', 'gestormid']);

    component.onSubmit('escalado');

    expect(component.updateIncident).toHaveBeenCalledWith('1', expectedUpdatedIncident);
  });

  it('should show error toast when onSubmit is called with "escalado" and error al obtener el nuevo gestor', () => {
    component.ngOnInit();
    component.incidentForm.patchValue({
      cliente: '1',
      nombreUsuario: 'User 1',
      correoUsuario: 'user1@example.com',
      direccionUsuario: 'Address 1',
      telefonoUsuario: '1234567890',
      descripcionProblema: 'Test description',
      prioridad: 'alta',
      estado: 'abierto',
      tipoIncidencia: 'tipo1',
      nuevoComentario: 'Nuevo comentario'
    });

    component.currentGestorId = '7';
    component.currentGestorObj = mockGestores[4];

    spyOn(component, 'getNewGestor').and.returnValue(['', '']);
    spyOn(component, 'showToast');

    component.onSubmit('escalado');

    expect(component.showToast).toHaveBeenCalledWith('Error al obtener el nuevo gestor', 'Error', 'error');
  });

  it('should show error toast when onSubmit is called with "escalado" and no more levels', () => {
    component.ngOnInit();
    component.incidentForm.patchValue({
      cliente: '1',
      nombreUsuario: 'User 1',
      correoUsuario: 'user1@example.com',
      direccionUsuario: 'Address 1',
      telefonoUsuario: '1234567890',
      descripcionProblema: 'Test description',
      prioridad: 'alta',
      estado: 'abierto',
      tipoIncidencia: 'tipo1',
      nuevoComentario: 'Nuevo comentario'
    });

    component.currentGestorId = '7';
    component.currentGestorObj = mockGestores[4];

    spyOn(component, 'getNewGestor').and.returnValue(['No hay más niveles', 'No hay más niveles']);
    spyOn(component, 'showToast');

    component.onSubmit('escalado');

    expect(component.showToast).toHaveBeenCalledWith('No hay más niveles de escalado', 'Error', 'error');
  });
});
