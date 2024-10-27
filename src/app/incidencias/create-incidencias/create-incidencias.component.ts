import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
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
      tipoIncidencia: ['incidencia'],
      canalIngreso: ['web'],
      prioridad: ['baja'],
      estado: ['abierto'],
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
      canal: 'web',
      tipo: this.incidentForm.get('tipoIncidencia')?.value,
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
        newIncident.respuestaIA,
        newIncident.canal,
        newIncident.tipo
      )
      .subscribe(
        (response) => {
          localStorage.setItem('incidente', JSON.stringify(response));
          this.showToast('Numero de caso: ' + String(response.id), 'Incidente ' + accion + ' correctamente', 'success');
          this.incidentForm.reset();
          this.afterReset();
        },
        (error) => {
          this.showToast(error, 'Incidente no' + accion + ' correctamente', 'error');
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
    this.incidentForm.get('tipoIncidencia')?.setValue('incidencia');
    this.incidentForm.get('canalIngreso')?.setValue('web');
    this.incidentForm.get('prioridad')?.setValue('baja');
    this.incidentForm.get('estado')?.setValue('abierto');

    this.incidentForm.get('fecha')?.disable();
    this.incidentForm.get('canalIngreso')?.disable();
    this.incidentForm.get('respuestaIA')?.disable();
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
      const incrementedNumber = number + 1;
      return current.replace(/(\d+)$/, incrementedNumber.toString());
    }
    return current;
  }

  showToast(message1: string, message2: string, type: 'success' | 'error') {
    const configToast = {
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-center'
    };

    if (type === 'error') {
      this.toastr.error(message1, message2, configToast);
    } else {
      this.toastr.success(message1, message2, configToast);
    }
  }
}
