import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {CrearIncidenteService} from '../../services/crear-incidente.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavbarComponent} from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-create-incidencias',
  templateUrl: './create-incidencias.component.html',
  styleUrl: './create-incidencias.component.scss',
  imports: [ReactiveFormsModule, NavbarComponent, CommonModule],
  providers: [CrearIncidenteService, Router],
  standalone: true
})
export class CreateIncidenciasComponent {
  incidentForm!: FormGroup;
  crearIncidenteFlag = '';
  escalarIncidenteFlag = '';
  apiUrl = environment.urlApi + environment.portCrearIncidentes;

  constructor(
    private formBuilder: FormBuilder,
    private crearIncidenteService: CrearIncidenteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.incidentForm = this.formBuilder.group({
      cliente: ['', Validators.required],
      fecha: [new Date().toISOString().substring(0, 16), Validators.required],
      nombreUsuario: ['', Validators.required],
      telefonoUsuario: [''],
      correoUsuario: ['', Validators.email],
      direccionUsuario: [''],
      descripcionProblema: ['', Validators.required],
      tipoIncidencia: ['Incidencia'],
      canalIngreso: ['Web'],
      prioridad: ['Baja'],
      estado: ['Abierto'],
      respuestaIA: ['', Validators.required]
    });

    const colombiaTimeWithSeconds = new Date().toLocaleString('en-US', {timeZone: 'America/Bogota'});
    this.incidentForm.patchValue({
      fecha: new Date(colombiaTimeWithSeconds).toISOString().replace('T', ' ').substring(0, 19)
    });
    this.incidentForm.get('fecha')?.disable();
    this.incidentForm.get('canalIngreso')?.disable();
    this.incidentForm.get('respuestaIA')?.disable();
  }

  onSubmit(): void {
    this.sendRequest('crear');
  }

  onEscalar(): void {
    this.sendRequest('escalar');
  }

  sendRequest(tarea: string): void {
    if (this.incidentForm.valid) {
      let gestor = 'nivel 1';
      if (tarea === 'escalar') {
        gestor = 'nivel 2';
      }

      const newIncident = {
        cliente: this.incidentForm.get('cliente')?.value,
        fecha: this.incidentForm.get('fecha')?.value,
        nombreUsuario: this.incidentForm.get('nombreUsuario')?.value,
        correoUsuario: this.incidentForm.get('correoUsuario')?.value,
        direccionUsuario: this.incidentForm.get('direccionUsuario')?.value,
        telefonoUsuario: this.incidentForm.get('telefonoUsuario')?.value,
        descripcionProblema: this.incidentForm.get('descripcionProblema')?.value,
        prioridad: this.incidentForm.get('prioridad')?.value,
        estado: this.incidentForm.get('estado')?.value,
        respuestaIA: this.incidentForm.get('respuestaIA')?.value,
        gestor: gestor
      };
      this.crearIncidenteService
        .crearIncidente(
          newIncident.cliente,
          newIncident.fecha,
          newIncident.nombreUsuario,
          newIncident.correoUsuario,
          newIncident.direccionUsuario,
          newIncident.telefonoUsuario,
          newIncident.descripcionProblema,
          newIncident.prioridad,
          newIncident.estado,
          newIncident.respuestaIA
        )
        .subscribe(
          (response) => {
            localStorage.setItem('incidente', JSON.stringify(response));
            if (tarea == 'crear') {
              this.crearIncidenteFlag = 'Incidente creado correctamente';
            } else {
              this.escalarIncidenteFlag = 'Incidente escalado correctamente';
            }
            this.incidentForm.reset();
          },
          (error) => {
            console.error('Error al crear incidente:', error);
            if (tarea == 'crear') {
              this.escalarIncidenteFlag = '';
              this.crearIncidenteFlag = 'Incidente no creado';
            } else {
              this.crearIncidenteFlag = '';
              this.escalarIncidenteFlag = 'Incidente no escalado';
            }
          }
        );
    }
  }

  onDescripcionProblemaChange(): void {
    const value = this.incidentForm.get('descripcionProblema')?.value;
    if (value && value.trim != '') {
      this.incidentForm.get('respuestaIA')?.enable();
      this.incidentForm.get('respuestaIA')?.setValue('Respuesta generdada por IA');
      this.incidentForm.get('respuestaIA')?.disable();
    } else {
      this.incidentForm.get('respuestaIA')?.enable();
      this.incidentForm.get('respuestaIA')?.setValue('');
      this.incidentForm.get('respuestaIA')?.disable();
    }
  }
}
