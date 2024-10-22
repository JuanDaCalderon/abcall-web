import {Component, OnInit, inject} from '@angular/core';
import {IncidenciasService} from '../../services/incidencias.service';
import {Incidente} from '../../models/incidentes';
import {NgFor, NgIf} from '@angular/common';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Subject, takeUntil} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-list-incidencias',
  standalone: true,
  imports: [NgFor, NgIf, TranslateModule],
  providers: [IncidenciasService],
  templateUrl: './list-incidencias.component.html',
  styleUrl: './list-incidencias.component.scss'
})
export class ListIncidenciasComponent implements OnInit {
  incidencias: Incidente[] = [];
  language = 'es';
  translate: TranslateService = inject(TranslateService);
  private destroy$ = new Subject<void>();

  constructor(
    private incidenciasService: IncidenciasService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getIncidencias();
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

  OnSelect(id: number): void {
    console.log('Incidencia seleccionada:', id);
    this.router.navigate(['/view-incidencia', id]);
  }
}
