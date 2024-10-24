import {Component, OnInit} from '@angular/core';
import {Incidente} from '../../models/incidentes';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {IncidenciasService} from '../../services/incidencias.service';
import {ActivatedRoute} from '@angular/router';
import {CrearIncidenteService} from '../../services/crear-incidente.service';

@Component({
  selector: 'app-view-incidencia',
  templateUrl: './view-incidencia.component.html',
  styleUrls: ['./view-incidencia.component.css'],
  imports: [ReactiveFormsModule, NavbarComponent, CommonModule],
  providers: [IncidenciasService],
  standalone: true
})
export class ViewIncidenciaComponent implements OnInit {
  incidentForm!: FormGroup;
  crearIncidenteFlag = '';
  escalarIncidenteFlag = '';
  incidencia: Incidente = {} as Incidente;

  constructor(
    private formBuilder: FormBuilder,
    private crearIncidenteService: CrearIncidenteService,
    private incidenciasService: IncidenciasService,
    private route: ActivatedRoute
  ) {
    this.incidentForm = this.formBuilder.group({
      cliente: ['', Validators.required],
      fecha: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      correoUsuario: ['', [Validators.required, Validators.email]],
      telefonoUsuario: ['', Validators.required],
      direccionUsuario: ['', Validators.required],
      descripcionProblema: ['', Validators.required],
      prioridad: ['', Validators.required],
      estado: ['', Validators.required],
      respuestaIA: [{value: '', disabled: true}]
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.loadIncident(id);
    });
  }

  onSubmit(): void {
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
      gestor: 'gestorNivel1'
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
          /*this.toastr.success('Numero de caso: ' + String(response.ID), 'Incidente creado correctamente ', {
            closeButton: true,
            timeOut: 10000,
            positionClass: 'toast-bottom-center'
          });*/
          this.incidentForm.reset();
          //this.afterReset();
          //this.router.navigate(['/home']);
          this.crearIncidenteFlag = 'Incidente creado';
        },
        (error) => {
          console.error('Error al crear incidente:', error);
          this.escalarIncidenteFlag = '';
          this.crearIncidenteFlag = 'Incidente no creado';
          /*this.toastr.error('Error al crear el incidente', 'Error', {
            closeButton: true,
            timeOut: 3000,
            positionClass: 'toast-bottom-center'
          });*/
        }
      );
  }

  onEscalar(): void {
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
      gestor: 'gestorNivel1'
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
          /*this.toastr.success('Numero de caso: ' + String(response.ID), 'Incidente escalado correctamente ', {
            closeButton: true,
            timeOut: 10000,
            positionClass: 'toast-bottom-center'
          });*/
          this.incidentForm.reset();
          //this.afterReset();
          //this.router.navigate(['/home']);
          this.escalarIncidenteFlag = 'Incidente escalado';
        },
        (error) => {
          console.error('Error al crear incidente:', error);
          this.crearIncidenteFlag = '';
          this.escalarIncidenteFlag = 'Incidente no escalado';
          /*this.toastr.error('Error al escalar el incidente', 'Error', {
            closeButton: true,
            timeOut: 3000,
            positionClass: 'toast-bottom-center'
          });*/
        }
      );
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

  loadIncident(id: string): void {
    this.incidenciasService.getIncidencia(id).subscribe(
      (data: Incidente) => {
        this.incidentForm.patchValue({
          cliente: data.CLIENTE,
          fecha: data.FECHACREACION,
          nombreUsuario: data.USUARIO,
          correoUsuario: data.CORREO,
          telefonoUsuario: data.TELEFONO,
          direccionUsuario: data.DIRECCION,
          descripcionProblema: data.DESCRIPCION,
          prioridad: data.PRIORIDAD,
          estado: data.ESTADO,
          respuestaIA: 'Rspuesta IA'
        });
        console.log('Incidencia:', data);
      },
      (error) => {
        console.error('Error al obtener la incidencia', error);
      }
    );
  }
}
