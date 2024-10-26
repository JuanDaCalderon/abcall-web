import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {CrearIncidenteService} from '../../services/crear-incidente.service';
import {Router} from '@angular/router';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {ToastrService} from 'ngx-toastr';
import {ClienteService} from '../../services/cliente.service';
import {Usuario} from '../../models/usuario';

@Component({
  selector: 'app-create-incidencias',
  templateUrl: './create-incidencias.component.html',
  styleUrl: './create-incidencias.component.scss',
  imports: [ReactiveFormsModule, NavbarComponent, CommonModule],
  providers: [CrearIncidenteService, Router],
  standalone: true
})
export class CreateIncidenciasComponent implements OnInit {
  clientes: Usuario[] = [];
  usuarios: Usuario[] = [];
  incidentForm!: FormGroup;
  crearIncidenteFlag = '';
  escalarIncidenteFlag = '';
  apiUrl = environment.urlApi + environment.portCrearIncidentes;

  constructor(
    private formBuilder: FormBuilder,
    private crearIncidenteService: CrearIncidenteService,
    private toastr: ToastrService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.incidentForm = this.formBuilder.group({
      cliente: ['', Validators.required],
      fecha: [''],
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

    this.incidentForm.get('fecha')?.disable();
    this.incidentForm.get('canalIngreso')?.disable();
    this.incidentForm.get('respuestaIA')?.disable();

    this.loadUsersByRol('4');
    this.loadUsersByRol('5');
  }

  onSubmit(accion: string): void {
    const gestor = accion === 'escalado' ? this.updateGestor('GestorNivel1') : 'GestorNivel1';

    const newIncident = {
      cliente: this.incidentForm.get('cliente')?.value,
      fecha: this.generateTime(),
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
          this.toastr.success('Numero de caso: ' + String(response.id), 'Incidente ' + accion + ' correctamente', {
            closeButton: true,
            timeOut: 10000,
            positionClass: 'toast-bottom-center'
          });
          this.incidentForm.reset();
          this.afterReset();
          this.escalarIncidenteFlag = 'Incidente' + accion;
        },
        (error) => {
          this.toastr.error(error, 'Incidente no ' + accion, {
            closeButton: true,
            timeOut: 3000,
            positionClass: 'toast-bottom-center'
          });
        }
      );
  }

  onDescripcionProblemaChange(): void {
    const value = this.incidentForm.get('descripcionProblema')?.value;
    if (value && value.trim != '') {
      this.incidentForm.get('respuestaIA')?.setValue('Respuesta generdada por IA');
    } else {
      this.incidentForm.get('respuestaIA')?.setValue('');
    }
  }

  afterReset(): void {
    this.crearIncidenteFlag = '';
    this.escalarIncidenteFlag = '';

    this.incidentForm.get('tipoIncidencia')?.setValue('Incidencia');
    this.incidentForm.get('canalIngreso')?.setValue('Web');
    this.incidentForm.get('prioridad')?.setValue('Baja');
    this.incidentForm.get('estado')?.setValue('Abierto');

    this.incidentForm.get('fecha')?.disable();
    this.incidentForm.get('canalIngreso')?.disable();
    this.incidentForm.get('respuestaIA')?.disable();

    const colombiaTimeWithSeconds = new Date().toLocaleString('en-US', {timeZone: 'America/Bogota'});
    this.incidentForm.patchValue({
      fecha: new Date(colombiaTimeWithSeconds).toISOString().replace('T', ' ').substring(0, 19)
    });
  }

  loadUsersByRol(rol: string): void {
    this.clienteService.getUsers(rol).subscribe(
      (usuarios) => {
        if (rol === '4') this.clientes = usuarios;
        else this.usuarios = usuarios;
      },
      (error) => {
        const errorMsg = rol === '4' ? 'Error al cargar clientes' : 'Error al cargar usuarios';
        console.error('error:', error);
        this.toastr.error(errorMsg, 'Error', {
          closeButton: true,
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
      }
    );
  }

  generateTime(): string {
    const colombiaTimeWithSeconds = new Date().toLocaleString('en-US', {timeZone: 'America/Bogota'});
    return new Date(colombiaTimeWithSeconds).toISOString().replace('T', ' ').substring(0, 19);
  }

  updateGestor(current: string): string {
    const match = current.match(/(\d+)$/);
    if (match) {
      const number = parseInt(match[0], 10);
      // Incrementar el número
      const incrementedNumber = number + 1;
      // Reemplazar el número en la cadena original con el número incrementado
      return current.replace(/(\d+)$/, incrementedNumber.toString());
    }
    // Si no hay número al final, devolver la cadena original
    return current;
  }
}
