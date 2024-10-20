import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DEFAULT_PASSWORD} from '../../constants';
import {GestorService} from '../../services/gestor.service';
import {Gestores, GESTORTIERS, ROLES} from '../../models/users';
import {take} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-crear-gestor',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './crear-gestor.component.html',
  styleUrl: './crear-gestor.component.scss'
})
export class CrearGestorComponent {
  public crearGestorForm: FormGroup = new FormGroup('');
  public isLoading = false;
  public gestorTiers = GESTORTIERS;
  constructor(
    private gestorService: GestorService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {
    this.crearGestorForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      password: [DEFAULT_PASSWORD],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: [''],
      rol: [ROLES.gestor],
      gestortier: [GESTORTIERS.junior, [Validators.required]]
    });
  }

  public onSubmit() {
    this.isLoading = true;
    const gestor: Gestores = this.crearGestorForm.value;
    this.gestorService
      .createGestor(gestor)
      .pipe(take(1))
      .subscribe((gestorCreated) => {
        if (gestorCreated) {
          this.toastrService.success('gestor creado satisfactoriamente', 'creación', {
            closeButton: true,
            progressBar: true
          });
          this.crearGestorForm.reset();
        }
      })
      .add(() => {
        this.isLoading = false;
      });
  }
}