import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NavbarComponent} from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-create-incidencias',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './create-incidencias.component.html',
  styleUrl: './create-incidencias.component.scss'
})
export class CreateIncidenciasComponent implements OnInit {
  incidentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.incidentForm = this.fb.group({
      cliente: ['', Validators.required],
      fecha: [new Date().toISOString().substring(0, 16), Validators.required],
      nombreUsuario: ['', Validators.required],
      telefonoUsuario: ['', Validators.required],
      correoUsuario: ['', [Validators.required, Validators.email]],
      direccionUsuario: [''],
      descripcionProblema: ['', Validators.required],
      tipoIncidencia: ['Incidencia'],
      canalIngreso: ['Web'],
      prioridad: ['Baja'],
      estado: ['Abierto'],
      respuestaIA: ['']
    });
  }

  onSubmit(): void {
    if (this.incidentForm.valid) {
      console.log('Form submitted:', this.incidentForm.value);
      // Handle form submission logic, such as sending data to a backend
    } else {
      console.log('Form is invalid');
    }
  }

  onEscalar(): void {
    console.log('Escalar button clicked');
    // Handle the escalation logic here
  }

  onCloseCase(): void {
    console.log('Cerrar caso button clicked');
    // Handle closing the case
  }
}
