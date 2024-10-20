import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterModule} from '@angular/router';
import {Usuario} from '../../models/usuario';
import {NgIf} from '@angular/common';
import {Role} from '../../models/role';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, RouterModule],
  providers: [AuthService, Router],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  public usuario: Usuario = new Usuario(0, '', '', '', '', '', '', '', '', '', new Role(0, '', []));
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.usuario = this.authService.getUsuario();
    console.log(this.usuario);
  }

  logout(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/']);
  }
}
