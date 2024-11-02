import {Component, OnInit} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {Role} from '../../models/role';
import {RoleService} from '../../services/role.service';
import {Permiso} from '../../models/permiso';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-roles-permisos',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, FormsModule],
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
  public permisosEstado: Record<number, boolean> = {};
  public permiso1 = false;
  public permiso2 = false;
  public permiso3 = false;
  public permiso4 = false;
  public permiso5 = false;
  constructor(
    private fb: FormBuilder,
    public roleService: RoleService
  ) {
    this.roleForm = this.fb.group({
      nombre: ['', Validators.required]
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
        this.permisos = this.role.permisos;
        this.isVisible = !this.isVisible;
        this.permiso1 = false;
        this.permiso2 = false;
        this.permiso3 = false;
        this.permiso4 = false;
        this.permiso5 = false;

        this.permisos.forEach((permiso) => {
          if (permiso.id === 1) {
            this.permiso1 = true;
          } else if (permiso.id === 2) {
            this.permiso2 = true;
          } else if (permiso.id === 3) {
            this.permiso3 = true;
          } else if (permiso.id === 4) {
            this.permiso4 = true;
          } else if (permiso.id === 5) {
            this.permiso5 = true;
          }
        });
      },
      (error) => {
        console.error('Error al obtener el role', error);
      }
    );
  }

  onSubmit(): void {
    if (this.roleForm.valid) {
      const newRole = {
        id: 0,
        nombre: this.roleForm.value.nombre,
        permisos: []
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

  cambiarEstadoPermiso(nombre: string) {
    if (nombre === 'permiso1') {
      this.permiso1 = !this.permiso1;
    } else if (nombre === 'permiso2') {
      this.permiso2 = !this.permiso2;
    } else if (nombre === 'permiso3') {
      this.permiso3 = !this.permiso3;
    } else if (nombre === 'permiso4') {
      this.permiso4 = !this.permiso4;
    } else if (nombre === 'permiso5') {
      this.permiso5 = !this.permiso5;
    }
  }

  actualizarPermiso(role_id: number) {
    const permisos = [];
    if (this.permiso1) {
      permisos.push(new Permiso(1, 'permiso1'));
    }
    if (this.permiso2) {
      permisos.push(new Permiso(2, 'permiso2'));
    }
    if (this.permiso3) {
      permisos.push(new Permiso(3, 'permiso3'));
    }
    if (this.permiso4) {
      permisos.push(new Permiso(4, 'permiso4'));
    }
    if (this.permiso5) {
      permisos.push(new Permiso(5, 'permiso5'));
    }

    this.roleService.actualizarPermisos(role_id, permisos).subscribe((response) => {
      console.log('Permisos actualizados exitosamente:', response);
      this.showToast('Permisos actualizados exitosamente!', 'success');
      this.getAllRoles();
    });
  }
}
