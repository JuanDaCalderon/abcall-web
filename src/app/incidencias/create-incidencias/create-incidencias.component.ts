import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../../../environments/environment';
import {CrearIncidenteService} from '../../services/crear-incidente.service';
import {Router} from '@angular/router';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {ToastrService} from 'ngx-toastr';
import {Usuario} from '../../models/usuario';
import {Role} from '../../models/role';
import {AuthService} from '../../services/auth.service';

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
  usuariosRol: Usuario[] = [];
  apiUrl = environment.urlApi + environment.portCrearIncidentes;
  public usuario: Usuario = new Usuario('', '', '', '', '', '', '', '', '', '', new Role(0, '', []));

  constructor(
    private formBuilder: FormBuilder,
    private crearIncidenteService: CrearIncidenteService,
    //private router: Router,
    //private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.incidentForm = this.formBuilder.group({
      cliente: ['', Validators.required],
      fecha: [new Date().toISOString().substring(0, 16), Validators.required],
      nombreUsuario: [''],
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

    this.usuario = this.authService.getUsuario();
    this.getAllUsersByRole();
  }

  getAllUsersByRole(): void {
    this.authService.getAllUsersByRole(4).subscribe(
      (data: Usuario[]) => {
        this.usuariosRol = data;
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios', error);
      }
    );
  }

  onSubmit(): void {
    const newIncident = {
      cliente: this.incidentForm.get('cliente')?.value,
      fecha: this.incidentForm.get('fecha')?.value,
      nombreUsuario: this.usuario.id,
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
          this.toastr.success('Numero de caso: ' + String(response.id), 'Incidente creado correctamente ', {
            closeButton: true,
            timeOut: 10000,
            positionClass: 'toast-bottom-center'
          });
          this.incidentForm.reset();
          this.afterReset();
          //this.router.navigate(['/home']);
          this.crearIncidenteFlag = 'Incidente creado';
        },
        (error) => {
          console.error('Error al crear incidente:', error);
          this.escalarIncidenteFlag = '';
          this.crearIncidenteFlag = 'Incidente no creado';
          this.toastr.error('Error al crear el incidente', 'Error', {
            closeButton: true,
            timeOut: 3000,
            positionClass: 'toast-bottom-center'
          });
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
          this.toastr.success('Numero de caso: ' + String(response.id), 'Incidente escalado correctamente ', {
            closeButton: true,
            timeOut: 10000,
            positionClass: 'toast-bottom-center'
          });
          this.incidentForm.reset();
          this.afterReset();
          //this.router.navigate(['/home']);
          this.escalarIncidenteFlag = 'Incidente escalado';
        },
        (error) => {
          console.error('Error al crear incidente:', error);
          this.crearIncidenteFlag = '';
          this.escalarIncidenteFlag = 'Incidente no escalado';
          this.toastr.error('Error al escalar el incidente', 'Error', {
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
}
