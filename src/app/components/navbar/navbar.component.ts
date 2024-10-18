import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {Usuario} from '../../models/usuario';
import {NgIf} from '@angular/common';
import {Role} from '../../models/role';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  public usuario: Usuario = new Usuario(0, '', '', '', '', '', '', '', '', '', new Role(0, '', []));

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const storedUsuario = localStorage.getItem('usuario');
    this.usuario = storedUsuario ? JSON.parse(storedUsuario) : null;
  }

  logout(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/']);
  }
}
