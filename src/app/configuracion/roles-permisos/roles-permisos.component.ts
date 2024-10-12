import {Component, OnInit} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {Role} from '../../models/role';
import {RoleService} from '../../services/role.service';

@Component({
  selector: 'app-roles-permisos',
  standalone: true,
  imports: [NgFor, NgIf],
  providers: [RoleService],
  templateUrl: './roles-permisos.component.html',
  styleUrl: './roles-permisos.component.scss'
})
export class RolesPermisosComponent implements OnInit {
  public roles: Role[] = [];
  public role: Role | undefined;
  public isVisible = false;
  constructor(public roleService: RoleService) {}

  ngOnInit(): void {
    this.getAllRoles();
  }

  toggleDiv() {
    this.isVisible = !this.isVisible;
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
        console.log(this.roles);
        this.isVisible = !this.isVisible;
      },
      (error) => {
        console.error('Error al obtener los roles', error);
      }
    );
  }
}
