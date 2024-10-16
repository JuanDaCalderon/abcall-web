import {Component, OnInit} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {Role} from '../../models/role';
import {RoleService} from '../../services/role.service';
import {Permiso} from '../../models/permiso';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-roles-permisos',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  providers: [RoleService],
  templateUrl: './roles-permisos.component.html',
  styleUrl: './roles-permisos.component.scss'
})
export class RolesPermisosComponent implements OnInit {
  public roles: Role[] = [];
  public role: Role | undefined;
  public new_role: Role | undefined;
  public roleForm: FormGroup;
  public isVisible = false;
  public permisos: Permiso[] = [];
  constructor(
    private fb: FormBuilder,
    public roleService: RoleService
  ) {
    this.roleForm = this.fb.group({
      NOMBRE: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.getAllRoles();
  }
  getAllRoles() {
    this.roleService.getAllRoles().subscribe(
      (data: Role[]) => {
        this.roles = data;
        console.log(this.roles);
      },
      (error) => {
        console.error('Error al obtener los roles', error);
      }
    );
  }

  getRole(roleId: number) {
    this.roleService.getRole(roleId).subscribe(
      (data: Role) => {
        this.role = data;
        console.log(this.role);
        this.permisos = this.role.PERMISOS;
        this.isVisible = !this.isVisible;
      },
      (error) => {
        console.error('Error al obtener el role', error);
      }
    );
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      const newRole = {
        ID: 0,
        NOMBRE: this.roleForm.value.NOMBRE,
        PERMISOS: []
      };

      this.roleService.createRole(newRole).subscribe(
        (response) => {
          console.log('Rol creado exitosamente:', response);
          this.showToast('Rol creado exitosamente!', 'success');
          this.roleForm.reset();
          this.getAllRoles();
        },
        (error) => {
          const errorMessage = error?.error?.message || 'Ocurrió un error inesperado';
          console.error('Error al crear el rol:', error.error.message);
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
