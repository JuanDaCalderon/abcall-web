import {Component, OnInit} from '@angular/core';
import {IncidenciasService} from '../../services/incidencias.service';
import {Incidente} from '../../models/incidentes';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-list-incidencias',
  standalone: true,
  imports: [NgFor, NgIf],
  providers: [IncidenciasService],
  templateUrl: './list-incidencias.component.html',
  styleUrl: './list-incidencias.component.scss'
})
export class ListIncidenciasComponent implements OnInit {
  incidencias: Incidente[] = [];

  constructor(private incidenciasService: IncidenciasService) {}

  ngOnInit(): void {
    this.getIncidencias();
  }

  getIncidencias() {
    this.incidenciasService.getIncidencias().subscribe(
      (data: Incidente[]) => {
        this.incidencias = data;
        console.log(this.incidencias[0]);
      },
      (error) => {
        console.error('Error al obtener la lista de incidencias', error);
      }
    );
  }
  reloadIncidencias(): void {
    this.getIncidencias();
  }
}
