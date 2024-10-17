import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CrearIncidenteService} from '../../services/crear-incidente.service';
import {catchError, Observable, take} from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {Incidente} from '../../models/incidente';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-create-incidencias',
  templateUrl: './create-incidencias.component.html',
  styleUrl: './create-incidencias.component.scss',
  imports: [ReactiveFormsModule, NavbarComponent, CommonModule, HttpClientModule],
  providers: [CrearIncidenteService],
  standalone: true
})
export class CreateIncidenciasComponent implements OnInit {
  incidentForm!: FormGroup;
  crearIncidenteFlag!: string;
  private apiUrl = environment.urlApi + environment.portCrearIncidentes;

  constructor(
    private fb: FormBuilder,
    //private crearIncidenteService: CrearIncidenteService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.incidentForm = this.fb.group({
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
  }

  onSubmit(): void {
    if (this.incidentForm.valid) {
      // Handle form submission logic, such as sending data to a backend
      this.crearIncidente(
        this.incidentForm.get('cliente')?.value,
        this.incidentForm.get('fecha')?.value,
        this.incidentForm.get('nombreUsuario')?.value,
        this.incidentForm.get('correoUsuario')?.value,
        this.incidentForm.get('direccionUsuario')?.value,
        this.incidentForm.get('telefonoUsuario')?.value,
        this.incidentForm.get('descripcionProblema')?.value,
        this.incidentForm.get('prioridad')?.value,
        this.incidentForm.get('estado')?.value,
        this.incidentForm.get('respuestaIA')?.value
      )
        .pipe(
          take(1),
          catchError(async () => {
            this.crearIncidenteFlag = 'Incidente no creado';
          })
        )
        .subscribe(async (value) => {
          if (value) {
            this.crearIncidenteFlag = 'Incidente creado correctamente';
            this.incidentForm.reset();
          }
        });
    }
  }

  public crearIncidente(
    cliente: string,
    fechacreacion: string,
    usuario: string,
    correo: string,
    direccion: string,
    telefono: string,
    descripcion: string,
    prioridad: string,
    estado: string,
    comentarios: string
  ): Observable<Incidente> {
    return this.http.post<Incidente>(`${this.apiUrl}:8000/incidentes`, {
      cliente,
      fechacreacion,
      usuario,
      correo,
      direccion,
      telefono,
      descripcion,
      prioridad,
      estado,
      comentarios
    });
  }

  onEscalar(): void {
    // Handle the escalation logic here
  }

  onCloseCase(): void {
    // Handle closing the case
  }
}
