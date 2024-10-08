import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-roles-permisos',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './roles-permisos.component.html',
  styleUrl: './roles-permisos.component.scss'
})
export class RolesPermisosComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
