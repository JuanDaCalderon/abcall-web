import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Usuario} from '../../models/usuario';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, RouterLinkActive, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public usuario: Usuario;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    const storedUsuario = localStorage.getItem('usuario');
    this.usuario = storedUsuario ? JSON.parse(storedUsuario) : null;
    console.log(this.usuario);
  }

  logout(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/']);
  }
}
