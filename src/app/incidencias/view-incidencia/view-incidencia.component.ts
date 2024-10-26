import {Component, OnInit} from '@angular/core';
import {Incidente} from '../../models/incidentes';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {IncidenciasService} from '../../services/incidencias.service';
import {ActivatedRoute} from '@angular/router';
import {CrearIncidenteService} from '../../services/crear-incidente.service';
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
  incidentForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private crearIncidenteService: CrearIncidenteService,
    private incidenciasService: IncidenciasService,
    private toastr: ToastrService,
    private clienteService: ClienteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadUsersByRol('4');
    this.loadUsersByRol('5');

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
      comentarios: ['']
    });

    this.incidentForm.get('fecha')?.disable();
    this.incidentForm.get('canalIngreso')?.disable();
    this.incidentForm.get('respuestaIA')?.disable();

    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.loadIncident(id);
    });
    this.incidentForm.get('canalIngreso')?.disable();
    this.incidentForm.get('fecha')?.disable();
    this.incidentForm.get('comentarios')?.disable();
  }

  onSubmit(): void {
    //const gestor = accion === 'escalado' ? this.updateGestor('GestorNivel1') : 'GestorNivel1';
    /*const newIncident = {
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
          this.toastr.success('Numero de caso: ' + String(response.id), 'Incidente ' + accion + ' correctamente', {
            closeButton: true,
            timeOut: 10000,
            positionClass: 'toast-bottom-center'
          });
          this.incidentForm.reset();
          this.afterReset();
        },
        (error) => {
          this.toastr.error(error, 'Incidente no ' + accion, {
            closeButton: true,
            timeOut: 3000,
            positionClass: 'toast-bottom-center'
          });
        }
      );*/
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

  afterReset(): void {
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

  async loadIncident(id: string): Promise<void> {
    this.incidenciasService.getIncidencia(id).subscribe(
      (data: Incidente) => {
        this.incidentForm.patchValue({
          cliente: data.cliente,
          fecha: data.fechacreacion,
          nombreUsuario: data.usuario,
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
}
