import {Component, OnInit, inject} from '@angular/core';
import {IncidenciasService} from '../../services/incidencias.service';
import {Incidente} from '../../models/incidentes';
import {NgFor, NgIf} from '@angular/common';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Subject, takeUntil} from 'rxjs';
import {FiltroIncidenciasPipe} from '../../pipes/filtro-incidencias.pipe';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Usuario} from '../../models/usuario';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-incidencias',
  standalone: true,
  imports: [NgFor, NgIf, TranslateModule, FiltroIncidenciasPipe, FormsModule],
  providers: [IncidenciasService, AuthService],
  templateUrl: './list-incidencias.component.html',
  styleUrl: './list-incidencias.component.scss'
})
export class ListIncidenciasComponent implements OnInit {
  incidencias: Incidente[] = [];
  usuarios: Usuario[] = [];
  language = 'es';
  translate: TranslateService = inject(TranslateService);
  private destroy$ = new Subject<void>();
  criterioBusqueda = '';
  constructor(
    private incidenciasService: IncidenciasService,
    private authService: AuthService,
    private router: Router
    //private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getIncidencias();
    this.getAllUsers();
  }

  getIncidencias() {
    this.incidenciasService
      .getIncidencias()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: Incidente[]) => {
          this.incidencias = data;
        },
        (error) => {
          console.error('Error al obtener la lista de incidencias', error);
        }
      );
  }
  reloadIncidencias(): void {
    this.getIncidencias();
  }
  changeLang(lang: string): void {
    this.language = lang;
    this.translate.use(lang);
  }

  getAllUsers(): void {
    this.authService.getAllUsers().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios', error);
      }
    );
  }

  getAllIncidenciasByUserId(event: Event) {
    const userId = (event.target as HTMLSelectElement).value;
    console.log('userid: ' + typeof userId);
    if (userId != '') {
      this.incidenciasService.getAllincidenciaByUserId(userId).subscribe(
        (data: Incidente[]) => {
          console.log('las incidencias del ususrio ' + data);
          this.incidencias = data;
        },
        (error) => {
          console.error('Error al obtener la lista de incidencias', error);
        }
      );
    } else {
      this.getIncidencias();
    }
  }

  getAllIncidenciasByCliente(event: Event) {
    const cliente = (event.target as HTMLSelectElement).value;
    console.log('cliente: ' + cliente);
    if (cliente != '') {
      this.incidenciasService.getAllincidenciaByCliente(cliente).subscribe(
        (data: Incidente[]) => {
          console.log('las incidencias del ususrio ' + data);
          this.incidencias = data;
        },
        (error) => {
          console.error('Error al obtener la lista de incidencias', error);
        }
      );
    } else {
      this.getIncidencias();
    }
  }

  OnSelect(id: number): void {
    console.log('Incidencia seleccionada:', id);
    this.router.navigate(['home/view-incidencia', id]);
  }
}
