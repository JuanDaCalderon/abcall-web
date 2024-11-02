import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {IncidenciasService} from '../../services/incidencias.service';
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
  providers: [IncidenciasService, Router],
  standalone: true
})
export class CreateIncidenciasComponent implements OnInit {
  clientes: Usuario[] = [];
  usuarios: Usuario[] = [];
  gestores: Usuario[] = [];
  incidentForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private crearIncidenteService: IncidenciasService,
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
    this.loadUsersByRol('3');
  }

  async onSubmit(accion: string): Promise<void> {
    const fecha = this.generateTime();
    const gestor = await this.getGestor(accion);

    const newIncident = {
      cliente: this.incidentForm.get('cliente')?.value,
      fechacreacion: fecha,
      usuario: this.incidentForm.get('nombreUsuario')?.value,
      correo: this.incidentForm.get('correoUsuario')?.value,
      direccion: this.incidentForm.get('direccionUsuario')?.value,
      telefono: this.incidentForm.get('telefonoUsuario')?.value,
      descripcion: this.incidentForm.get('descripcionProblema')?.value,
      prioridad: this.incidentForm.get('prioridad')?.value,
      estado: this.incidentForm.get('estado')?.value,
      respuestaIA: this.incidentForm.get('respuestaIA')?.value,
      canal: 'web',
      tipo: this.incidentForm.get('tipoIncidencia')?.value,
      comentarios:
        fecha +
        ' Caso creado \n' +
        'Descripcion del problema: ' +
        this.incidentForm.get('descripcionProblema')?.value +
        '\n' +
        'Respuesta IA: ' +
        this.incidentForm.get('respuestaIA')?.value +
        '\n' +
        'Gestor asignado: ' +
        gestor[1],
      gestor: gestor[0]
    };
    this.crearIncidenteService.createIncidencia(newIncident).subscribe((response) => {
      localStorage.setItem('incidente', JSON.stringify(response));
      this.showToast('Numero de caso: ' + String(response.id), 'Incidente ' + accion + ' correctamente', 'success');
      this.incidentForm.reset();
      this.afterReset();
    });
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

  generateTime(): string {
    const colombiaTimeWithSeconds = new Date().toLocaleString('en-US', {timeZone: 'America/Bogota'});
    return new Date(colombiaTimeWithSeconds).toISOString().replace('T', ' ').substring(0, 19);
  }

  getGestor(accion: string): string[] {
    const nivel = accion === 'creado' ? 'gestorjunior' : 'gestormid';
    const idGestor = ['', ''];
    this.loadUsersByRol('3');
    this.gestores.forEach((gestor) => {
      if (gestor.username === nivel) {
        idGestor[0] = gestor.id;
        idGestor[1] = gestor.username;
      }
    });
    return idGestor;
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

  async loadUsersByRol(rol: string): Promise<void> {
    this.clienteService.getUsers(rol).subscribe((usuarios) => {
      if (rol === '3') this.gestores = usuarios;
      else if (rol === '4') this.clientes = usuarios;
      else if (rol === '5') this.usuarios = usuarios;
    });
  }
}
