import {NgIf} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClienteService} from '../../services/cliente.service';
@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.scss'
})
export class CrearClienteComponent {
  public clientForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {
    this.clientForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required]
    });
  }
  onSubmit(): void {
    if (this.clientForm.valid) {
      const newClient = {
        id: 0,
        nombre: this.clientForm.value.nombre,
        email: this.clientForm.value.email,
        telefono: this.clientForm.value.telefono,
        direccion: this.clientForm.value.direccion
      };

      this.clienteService.createCliente(newClient).subscribe(
        (response) => {
          console.log('Cliente creado exitosamente:', response);
          this.showToast('Cliente creado exitosamente!', 'success');
          this.clientForm.reset();
        },
        (error) => {
          const errorMessage = error?.error?.message || 'Ocurrió un error inesperado';
          console.error('Error al crear el cliente:', error.error.message);
          this.showToast(errorMessage, 'error');
        }
      );
    }
  }

  showToast(message: string, type: 'success' | 'error') {
    const toastElement = document.getElementById('liveToast');
    const toastBody = toastElement?.querySelector('.toast-body');
    if (toastBody) {
      toastBody.textContent = message;
    }

    if (type === 'error') {
      toastElement?.classList.add('bg-danger');
    } else {
      toastElement?.classList.add('bg-success');
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toast = new (window as any).bootstrap.Toast(toastElement);
    toast.show();
  }
}