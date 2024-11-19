import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ClienteService} from '../../services/cliente.service';
import {TextosService} from '../../services/textos.service';
import {Textos} from '../../models/textos';
import {ToastrService} from 'ngx-toastr';

@Component({
  templateUrl: './personalizar-textos.component.html',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  styleUrls: ['./personalizar-textos.component.css']
})
export class PersonalizarTextosComponent implements OnInit {
  textosForm: FormGroup;
  clientes = [];
  textos: Textos;
  verifTexto = false;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private textosService: TextosService,
    private toastr: ToastrService
  ) {
    this.textosForm = this.fb.group({
      cliente: ['', Validators.required],
      saludo: ['', Validators.required],
      cierre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCliente('4');
  }

  loadCliente(rol: string): void {
    this.clienteService.getUsers(rol).subscribe((usuarios) => {
      if (rol === '4') this.clientes = usuarios;
    });
  }

  getTextos(event: Event): void {
    this.textos = new Textos(0, '', '', '');
    this.textosForm.get('saludo')?.setValue('');
    this.textosForm.get('cierre')?.setValue('');
    this.verifTexto = false;
    const clienteid = (event.target as HTMLSelectElement).value;
    this.textosService.getTextos(clienteid).subscribe((response) => {
      this.textos = response;
      this.textosForm.get('saludo')?.setValue(response.saludo);
      this.textosForm.get('cierre')?.setValue(response.cierre);
      this.verifTexto = true;
    });
  }

  putTextos(): void {
    const textos: Textos = {
      id: this.textos.id,
      clienteid: this.textosForm.get('cliente')?.value,
      saludo: this.textosForm.get('saludo')?.value,
      cierre: this.textosForm.get('cierre')?.value
    };
    this.textosService.putTextos(textos).subscribe(() => {
      this.showToast('Textos actualizados correctamente', 'success');
      this.textosForm.reset();
    });
  }

  postTextos(): void {
    const textos: Textos = {
      id: this.textos.id,
      clienteid: this.textosForm.get('cliente')?.value,
      saludo: this.textosForm.get('saludo')?.value,
      cierre: this.textosForm.get('cierre')?.value
    };
    this.textosService.postTextos(textos).subscribe(() => {
      this.showToast('Textos actualizados correctamente', 'success');
      this.textosForm.reset();
    });
  }

  validarTextos(): void {
    if (this.verifTexto == true) {
      this.putTextos();
    } else {
      this.postTextos();
    }
  }

  showToast(message1: string, type: 'success' | 'error') {
    const configToast = {
      closeButton: true,
      timeOut: 3000,
      positionClass: 'toast-bottom-center'
    };

    if (type === 'error') {
      this.toastr.error(message1, 'Error', configToast);
    } else {
      this.toastr.success(message1, 'Success', configToast);
    }
  }
}
