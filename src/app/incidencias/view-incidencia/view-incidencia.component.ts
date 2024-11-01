import {Component, OnInit} from '@angular/core';
import {Incidente, NewUpdatedIncidencia} from '../../models/incidentes';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {IncidenciasService} from '../../services/incidencias.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Usuario} from '../../models/usuario';
import {ClienteService} from '../../services/cliente.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-view-incidencia',
  templateUrl: './view-incidencia.component.html',
  styleUrls: ['./view-incidencia.component.css'],
  imports: [ReactiveFormsModule, NavbarComponent, CommonModule],
  providers: [IncidenciasService],
  standalone: true
})
export class ViewIncidenciaComponent implements OnInit {
  clientes: Usuario[] = [];
  usuarios: Usuario[] = [];
  gestores: Usuario[] = [];
  incidentForm!: FormGroup;
  issueId = '';

  constructor(
    private formBuilder: FormBuilder,
    private incidenciasService: IncidenciasService,
    private toastr: ToastrService,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadUsersByRol('4');
    this.loadUsersByRol('5');
    this.loadUsersByRol('3');

    this.incidentForm = this.formBuilder.group({
      cliente: ['', Validators.required],
      fecha: [''],
      nombreUsuario: ['', Validators.required],
      telefonoUsuario: [''],
      correoUsuario: ['', Validators.email],
      direccionUsuario: [''],
      descripcionProblema: ['', Validators.required],
      tipoIncidencia: [''],
      canalIngreso: [''],
      prioridad: [''],
      estado: [''],
      respuestaIA: ['', Validators.required],
      comentarios: [''],
      nuevoComentario: ['']
    });

    this.incidentForm.get('fecha')?.disable();
    this.incidentForm.get('canalIngreso')?.disable();
    this.incidentForm.get('respuestaIA')?.disable();

    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.issueId = id;
      this.loadIncident(id);
    });
    this.incidentForm.get('canalIngreso')?.disable();
    this.incidentForm.get('fecha')?.disable();
    this.incidentForm.get('comentarios')?.disable();
  }

  onSubmit(): void {
    //const gestor = accion === 'escalado' ? this.updateGestor('GestorNivel1') : 'GestorNivel1';

    const newLine = '\n------------------------------------\n' + this.generateTime() + '\n';

    const updatedIncident: NewUpdatedIncidencia = {
      cliente: this.incidentForm.get('cliente')?.value,
      fechacreacion: this.incidentForm.get('fecha')?.value,
      usuario: this.incidentForm.get('nombreUsuario')?.value,
      correo: this.incidentForm.get('correoUsuario')?.value,
      direccion: this.incidentForm.get('direccionUsuario')?.value,
      telefono: this.incidentForm.get('telefonoUsuario')?.value,
      descripcion: this.incidentForm.get('descripcionProblema')?.value,
      prioridad: this.incidentForm.get('prioridad')?.value,
      estado: this.incidentForm.get('estado')?.value,
      comentarios: this.incidentForm.get('comentarios')?.value + newLine + 'Comentario: ' + this.incidentForm.get('nuevoComentario')?.value,
      tipo: this.incidentForm.get('tipoIncidencia')?.value,
      canal: 'web',
      gestor: '04b9602d-d0d8-4bad-9ae2-4fe216b0b5c6'
    };

    this.updateIncident(this.issueId, updatedIncident);
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

  generateTime(): string {
    const colombiaTimeWithSeconds = new Date().toLocaleString('en-US', {timeZone: 'America/Bogota'});
    return new Date(colombiaTimeWithSeconds).toISOString().replace('T', ' ').substring(0, 19);
  }

  /*
  updateGestor(current: string): string {
    const match = current.match(/(\d+)$/);
    if (match) {
      const number = parseInt(match[0], 10);
      const incrementedNumber = number + 1;
      return current.replace(/(\d+)$/, incrementedNumber.toString());
    }
    return current;
  }*/

  async loadIncident(id: string): Promise<void> {
    this.incidenciasService.getIncidenciaById(id).subscribe(
      (data: Incidente) => {
        this.incidentForm.patchValue({
          cliente: data.cliente.id,
          fecha: data.fechacreacion,
          nombreUsuario: data.usuario.id,
          correoUsuario: data.correo,
          telefonoUsuario: data.telefono,
          direccionUsuario: data.direccion,
          descripcionProblema: data.descripcion,
          tipoIncidencia: data.tipo,
          canalIngreso: data.canal,
          prioridad: data.prioridad,
          estado: data.estado,
          comentarios: data.comentarios
          //respuestaIA: 'Respuesta IA'
        });
        console.log('Incidencia:', data);
      },
      (error) => {
        console.error('Error al obtener la incidencia', error);
      }
    );
  }

  async loadUsersByRol(rol: string): Promise<void> {
    this.clienteService.getUsers(rol).subscribe(
      (usuarios) => {
        if (rol === '3') this.gestores = usuarios;
        else if (rol === '4') this.clientes = usuarios;
        else if (rol === '5') this.usuarios = usuarios;
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

  async updateIncident(id: string, updatedIncidencia: NewUpdatedIncidencia): Promise<void> {
    this.incidenciasService.updateIncidencia(id, updatedIncidencia).subscribe(
      (response) => {
        this.showToast('Incidencia actualizada correctamente', 'Actualización exitosa' + response, 'success');
        this.router.navigate(['home']);
      },
      (error) => {
        console.error('Error al actualizar la incidencia', error);
        this.toastr.error('Error al actualizar la incidencia', 'Error', {
          closeButton: true,
          timeOut: 3000,
          positionClass: 'toast-bottom-center'
        });
      }
    );
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
