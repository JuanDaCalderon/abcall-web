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
import {Usuario} from '../../models/usuario';

describe('CreateIncidenciasComponent', () => {
  let component: CreateIncidenciasComponent;
  let fixture: ComponentFixture<CreateIncidenciasComponent>;
  let crearIncidenteService: jasmine.SpyObj<CrearIncidenteService>;
  //let toastrService: jasmine.SpyObj<ToastrService>;

  const mockIncidente: Incidente = {
    ID: 1,
    CLIENTE: 'Test Client',
    FECHACREACION: '2023-10-01',
    USUARIO: 'Test User',
    CORREO: 'prueba@prueba.com',
    DIRECCION: 'Test address',
    TELEFONO: '123456789',
    DESCRIPCION: 'Test description',
    PRIORIDAD: 'High',
    ESTADO: 'Open',
    COMENTARIOS: 'Test comments'
  };

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
    crearIncidenteService = TestBed.inject(CrearIncidenteService) as jasmine.SpyObj<CrearIncidenteService>;
    //toastrService = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.incidentForm;
    expect(form).toBeDefined();
    expect(form.get('cliente')?.value).toBe('');
    expect(form.get('nombreUsuario')?.value).toBe('');
    expect(form.get('telefonoUsuario')?.value).toBe('');
    expect(form.get('correoUsuario')?.value).toBe('');
    expect(form.get('direccionUsuario')?.value).toBe('');
    expect(form.get('descripcionProblema')?.value).toBe('');
    expect(form.get('tipoIncidencia')?.value).toBe('Incidencia');
    expect(form.get('canalIngreso')?.value).toBe('Web');
    expect(form.get('prioridad')?.value).toBe('Baja');
    expect(form.get('estado')?.value).toBe('Abierto');
    expect(form.get('respuestaIA')?.value).toBe('');
  });

  it('should disable certain form controls on initialization', () => {
    const form = component.incidentForm;
    expect(form.get('fecha')?.disabled).toBeTrue();
    expect(form.get('canalIngreso')?.disabled).toBeTrue();
    expect(form.get('respuestaIA')?.disabled).toBeTrue();
  });

  it('should reset the form and flags after successful submission', () => {
    component.usuario = {id: '123', nombres: 'Test User'} as Usuario;
    crearIncidenteService.crearIncidente.and.returnValue(of(mockIncidente));
    component.onSubmit();
    expect(component.crearIncidenteFlag).toBe('');
    expect(component.escalarIncidenteFlag).toBe('');
  });

  it('should handle error during incident creation', () => {
    const CrearIncidenteServiceStub: CrearIncidenteService = fixture.debugElement.injector.get(CrearIncidenteService);
    const errorResponse = {error: {message: 'Incidente no creado'}};
    component.usuario = {id: '123', nombres: 'Test User'} as Usuario;
    spyOn(CrearIncidenteServiceStub, 'crearIncidente').and.returnValue(throwError(errorResponse));

    component.onSubmit();
    expect(component.crearIncidenteFlag).toBe('Incidente no creado');
  });

  it('should handle error during incident escalation', () => {
    const CrearIncidenteServiceStub: CrearIncidenteService = fixture.debugElement.injector.get(CrearIncidenteService);
    const errorResponse = {error: {message: 'Incidente no creado'}};
    spyOn(CrearIncidenteServiceStub, 'crearIncidente').and.returnValue(throwError(errorResponse));

    component.onEscalar();
    expect(component.escalarIncidenteFlag).toBe('Incidente no escalado');
  });

  it('should handle success during incident creation', () => {
    const CrearIncidenteServiceStub: CrearIncidenteService = fixture.debugElement.injector.get(CrearIncidenteService);
    component.usuario = {id: '123', nombres: 'Test User'} as Usuario;
    spyOn(CrearIncidenteServiceStub, 'crearIncidente').and.returnValue(of(mockIncidente));

    component.onSubmit();
    expect(component.crearIncidenteFlag).toBe('Incidente creado');
  });

  it('should handle success during incident escalate', () => {
    const CrearIncidenteServiceStub: CrearIncidenteService = fixture.debugElement.injector.get(CrearIncidenteService);
    spyOn(CrearIncidenteServiceStub, 'crearIncidente').and.returnValue(of(mockIncidente));

    component.onEscalar();
    expect(component.escalarIncidenteFlag).toBe('Incidente escalado');
  });

  it('should reset form and flags on afterReset', () => {
    component.afterReset();
    expect(component.crearIncidenteFlag).toBe('');
    expect(component.escalarIncidenteFlag).toBe('');
    expect(component.incidentForm.get('tipoIncidencia')?.value).toBe('Incidencia');
    expect(component.incidentForm.get('canalIngreso')?.value).toBe('Web');
    expect(component.incidentForm.get('prioridad')?.value).toBe('Baja');
    expect(component.incidentForm.get('estado')?.value).toBe('Abierto');
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
});
