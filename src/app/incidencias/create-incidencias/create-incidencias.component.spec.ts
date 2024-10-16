import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateIncidenciasComponent} from './create-incidencias.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CrearIncidenteService} from '../../services/crear-incidente.service';
import {of, throwError} from 'rxjs';
import {Incidente} from '../../models/incidente';

describe('CreateIncidenciasComponent', () => {
  let component: CreateIncidenciasComponent;
  let fixture: ComponentFixture<CreateIncidenciasComponent>;
  let crearIncidenteService: CrearIncidenteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, CreateIncidenciasComponent],
      providers: [CrearIncidenteService]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateIncidenciasComponent);
    component = fixture.componentInstance;
    crearIncidenteService = TestBed.inject(CrearIncidenteService);
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

  /*it('should not submit the form if it is invalid', () => {
    spyOn(crearIncidenteService, 'crearIncidente').and.returnValue(of({}));
    component.incidentForm.get('nombreUsuario')?.setValue('');
    component.onSubmit();
    expect(crearIncidenteService.crearIncidente).not.toHaveBeenCalled();
  });*/

  it('should submit the form if it is valid', () => {
    const mockIncidencia: Incidente = {
      id: 8,
      cliente: 'bavaria',
      fechacreacion: '2024-10-10 09:00:00',
      usuario: 'pepito perez',
      correo: 'a@a.com',
      direccion: 'calle 1 # 1-2',
      telefono: '300123456789',
      descripcion: 'descripcion prueba',
      prioridad: 'baja',
      estado: 'abierto',
      comentarios: 'comentario de prueba'
    };

    spyOn(crearIncidenteService, 'crearIncidente').and.returnValue(of(mockIncidencia));
    component.incidentForm.get('nombreUsuario')?.setValue('Test User');
    component.incidentForm.get('descripcionProblema')?.setValue('Test Description');
    component.onSubmit();
    expect(crearIncidenteService.crearIncidente).toHaveBeenCalled();
  });

  it('should handle form submission error', () => {
    spyOn(crearIncidenteService, 'crearIncidente').and.returnValue(throwError('error'));
    component.incidentForm.get('nombreUsuario')?.setValue('Test User');
    component.incidentForm.get('descripcionProblema')?.setValue('Test Description');
    component.onSubmit();
    expect(component.crearIncidenteFlag).toBe('Incidente no creado');
  });

  it('should reset the form after successful submission', () => {
    const mockIncidencia: Incidente = {
      id: 8,
      cliente: 'bavaria',
      fechacreacion: '2024-10-10 09:00:00',
      usuario: 'pepito perez',
      correo: 'a@a.com',
      direccion: 'calle 1 # 1-2',
      telefono: '300123456789',
      descripcion: 'descripcion prueba',
      prioridad: 'baja',
      estado: 'abierto',
      comentarios: 'comentario de prueba'
    };

    spyOn(crearIncidenteService, 'crearIncidente').and.returnValue(of(mockIncidencia));
    component.incidentForm.get('nombreUsuario')?.setValue('Test User');
    component.incidentForm.get('descripcionProblema')?.setValue('Test Description');
    component.onSubmit();
    expect(component.crearIncidenteFlag).toBe('Incidente creado correctamente');
    expect(component.incidentForm.pristine).toBeTrue();
  });
});
