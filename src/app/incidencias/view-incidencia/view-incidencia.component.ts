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
import {AuthService} from '../../services/auth.service';
import {Role} from '../../models/role';

@Component({
  selector: 'app-view-incidencia',
  templateUrl: './view-incidencia.component.html',
  styleUrls: ['./view-incidencia.component.css'],
  imports: [ReactiveFormsModule, NavbarComponent, CommonModule],
  providers: [IncidenciasService, AuthService],
  standalone: true
})
export class ViewIncidenciaComponent implements OnInit {
  clientes: Usuario[] = [];
  usuarios: Usuario[] = [];
  gestores: Usuario[] = [];
  currentGestorId = '';
  currentGestorObj: Usuario | undefined;
  incidentForm!: FormGroup;
  issueId = '';
  //storedUsuario = JSON.parse(localStorage.getItem('usuario')!).rol.nombre;
  showEscaladoButton = true;
  showCerrarButton = true;
  public usuario: Usuario = new Usuario('', '', '', '', '', '', '', '', '', '', new Role(0, '', []));

  constructor(
    private formBuilder: FormBuilder,
    private incidenciasService: IncidenciasService,
    private toastr: ToastrService,
    private clienteService: ClienteService,
    private authService: AuthService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.loadUsersByRol('4');
    this.loadUsersByRol('5');
    this.loadUsersByRol('3');
    this.usuario = this.authService.getUsuario();
    console.log(this.usuario.rol);

    this.incidentForm = this.formBuilder.group({
      cliente: ['', Validators.required],
      fecha: [''],
      nombreUsuario: ['', Validators.required],
      telefonoUsuario: [''],
      correoUsuario: ['', [Validators.required, Validators.email]],
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
    });

    this.loadIncident(this.issueId);

    if (this.usuario.rol.nombre === 'usuario') {
      this.setFildsForUsuario();
    }

    this.incidentForm.get('canalIngreso')?.disable();
    this.incidentForm.get('fecha')?.disable();
    this.incidentForm.get('comentarios')?.disable();
    //}
  }

  onSubmit(accion: string): void {
    let gestor = this.currentGestorId;
    let gestorUsername = this.currentGestorObj?.username;
    let newEstado = this.incidentForm.get('estado')?.value;

    if (accion === 'escalado') {
      const newGestor = this.getNewGestor(gestor);
      if (newGestor[0] === 'No hay más niveles') {
        this.showToast('No hay más niveles de escalado', 'Error', 'error');
        return;
      } else if (newGestor[0] === '') {
        this.showToast('Error al obtener el nuevo gestor', 'Error', 'error');
        return;
      } else {
        gestor = newGestor[0];
        gestorUsername = newGestor[1];
      }
    }

    if (accion === 'cerrado') {
      newEstado = 'cerrado';
    }

    const updatedIncident: NewUpdatedIncidencia = {
      cliente: this.incidentForm.get('cliente')?.value,
      usuario: this.incidentForm.get('nombreUsuario')?.value,
      correo: this.incidentForm.get('correoUsuario')?.value,
      direccion: this.incidentForm.get('direccionUsuario')?.value,
      telefono: this.incidentForm.get('telefonoUsuario')?.value,
      descripcion: this.incidentForm.get('descripcionProblema')?.value,
      prioridad: this.incidentForm.get('prioridad')?.value,
      estado: newEstado,
      canal: 'web',
      tipo: this.incidentForm.get('tipoIncidencia')?.value,
      comentarios:
        this.generateTime() +
        '\n' +
        'Comentario: ' +
        this.incidentForm.get('nuevoComentario')?.value +
        '\n' +
        'Gestor asignado: ' +
        gestorUsername +
        '\n' +
        '------------------------------------\n' +
        this.incidentForm.get('comentarios')?.value,
      gestor: gestor
    };

    this.showToast('Incidencia actualizada correctamente', 'Incidencia ' + this.issueId, 'success');
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

  async loadIncident(id: string): Promise<void> {
    console.log('Cargando incidencia con id:', id);
    this.incidenciasService.getIncidenciaById(id).subscribe((data: Incidente) => {
      this.loadInfoInForm(data);
    });
  }

  async loadUsersByRol(rol: string): Promise<void> {
    this.clienteService.getUsers(rol).subscribe((usuarios) => {
      if (rol === '3') this.gestores = usuarios;
      else if (rol === '4') this.clientes = usuarios;
      else if (rol === '5') this.usuarios = usuarios;
    });
  }

  async updateIncident(id: string, updatedIncidencia: NewUpdatedIncidencia): Promise<void> {
    this.incidenciasService.updateIncidencia(id, updatedIncidencia).subscribe((response) => {
      this.showToast('Incidencia actualizada correctamente', 'Actualización exitosa' + response, 'success');
      this.router.navigate(['home']);
    });
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

  getNewGestor(idCurrectGestor: string): string[] {
    const currentGestorLevel = this.getCurrentGestorLevel(idCurrectGestor);
    const newGestor = ['', ''];
    let newLevel = 'junior';
    if (currentGestorLevel === 'junior') {
      newLevel = 'mid';
    } else if (currentGestorLevel === 'mid') {
      newLevel = 'senior';
    } else if (currentGestorLevel === 'senior') {
      newLevel = 'lead';
    } else if (currentGestorLevel === 'lead') {
      newLevel = 'manager';
    } else if (currentGestorLevel === 'manager') {
      newLevel = 'No hay más niveles';
    }

    if (newLevel !== 'No hay más niveles') {
      this.loadUsersByRol('3');
      this.gestores.forEach((gestor) => {
        if (gestor.gestortier === newLevel) {
          newGestor[0] = gestor.id;
          newGestor[1] = gestor.username;
        }
      });
    } else {
      newGestor[0] = newLevel;
      newGestor[1] = newLevel;
    }
    return newGestor;
  }

  getCurrentGestorLevel(idCurrectGestor: string): string {
    let gestorLevel = '';
    this.gestores.forEach((gestor) => {
      if (gestor.id === idCurrectGestor) {
        gestorLevel = gestor.gestortier;
      }
    });
    console.log(gestorLevel);
    return gestorLevel;
  }

  setFildsForUsuario(): void {
    this.incidentForm.get('cliente')?.disable();
    this.incidentForm.get('nombreUsuario')?.disable();
    this.incidentForm.get('correoUsuario')?.disable();
    this.incidentForm.get('telefonoUsuario')?.disable();
    this.incidentForm.get('direccionUsuario')?.disable();
    this.incidentForm.get('descripcionProblema')?.disable();
    this.incidentForm.get('tipoIncidencia')?.disable();
    this.incidentForm.get('prioridad')?.disable();
    this.incidentForm.get('estado')?.disable();
    this.incidentForm.get('respuestaIA')?.disable();
    this.incidentForm.get('comentarios')?.disable();
    this.showEscaladoButton = false;
    this.showCerrarButton = false;
  }

  loadInfoInForm(data: Incidente): void {
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
    });
    this.setGestorInfo(data);
  }

  setGestorInfo(data: Incidente): void {
    this.currentGestorId = data.gestor.id;
    this.currentGestorObj = data.gestor;
  }
}
