import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateIncidenciasComponent} from './create-incidencias.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {of, throwError} from 'rxjs';
import {Incidente} from '../../models/incidente';

describe('CreateIncidenciasComponent', () => {
  let component: CreateIncidenciasComponent;
  let fixture: ComponentFixture<CreateIncidenciasComponent>;
  //let crearIncidenteService: CrearIncidenteService;

  const mockIncidente: Incidente = {
    id: 1,
    cliente: 'Test Client',
    fechacreacion: '2023-10-01',
    usuario: 'Test User',
    correo: 'prueba@prueba.com',
    direccion: 'Test address',
    telefono: '123456789',
    descripcion: 'Test description',
    prioridad: 'High',
    estado: 'Open',
    comentarios: 'Test comments'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, CreateIncidenciasComponent],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(CreateIncidenciasComponent);
    component = fixture.componentInstance;
    //crearIncidenteService = TestBed.inject(CrearIncidenteService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.incidentForm).toBeDefined();
    expect(component.incidentForm.get('fecha')?.value).toContain(new Date().toISOString().replace('T', ' ').substring(0, 16));
    expect(component.incidentForm.get('nombreUsuario')?.value).toBe('');
    expect(component.incidentForm.get('descripcionProblema')?.value).toBe('');
  });

  it('should disable fecha and canalIngreso fields on init', () => {
    expect(component.incidentForm.get('fecha')?.disabled).toBeTrue();
    expect(component.incidentForm.get('canalIngreso')?.disabled).toBeTrue();
  });

  it('should not submit the form if it is invalid', () => {
    spyOn(component, 'crearIncidente').and.returnValue(of(mockIncidente));
    component.incidentForm.get('nombreUsuario')?.setValue('');
    component.onSubmit();
    expect(component.crearIncidente).not.toHaveBeenCalled();
  });

  it('should submit the form if it is valid', () => {
    spyOn(component, 'crearIncidente').and.returnValue(of(mockIncidente));
    component.incidentForm.get('nombreUsuario')?.setValue('Test User');
    component.incidentForm.get('descripcionProblema')?.setValue('Test Description');
    component.onSubmit();
    expect(component.crearIncidente).toHaveBeenCalled();
  });

  it('should handle form submission error', () => {
    spyOn(component, 'crearIncidente').and.returnValue(throwError('error'));
    component.incidentForm.get('nombreUsuario')?.setValue('Test User');
    component.incidentForm.get('descripcionProblema')?.setValue('Test Description');
    component.onSubmit();
    expect(component.crearIncidenteFlag).toBe('Incidente no creado');
  });

  it('should reset the form after successful submission', () => {
    spyOn(component, 'crearIncidente').and.returnValue(of(mockIncidente));
    component.incidentForm.get('nombreUsuario')?.setValue('Test User');
    component.incidentForm.get('descripcionProblema')?.setValue('Test Description');
    component.onSubmit();
    expect(component.crearIncidenteFlag).toBe('Incidente creado correctamente');
    expect(component.incidentForm.pristine).toBeTrue();
  });
});
