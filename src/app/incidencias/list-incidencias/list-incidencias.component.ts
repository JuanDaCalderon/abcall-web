import {Component, OnInit} from '@angular/core';
import {IncidenciasService} from '../../services/incidencias.service';
import {Incidente} from '../../models/incidentes';

@Component({
  selector: 'app-list-incidencias',
  templateUrl: './list-incidencias.component.html',
  styleUrl: './list-incidencias.component.scss'
})
export class ListIncidenciasComponent implements OnInit {
  incidencias: Incidente[] = [];

  constructor(private incidenciasService: IncidenciasService) {}

  ngOnInit(): void {
    this.incidenciasService.getIncidencias().subscribe((data) => {
      this.incidencias = data;
    });
  }
}
