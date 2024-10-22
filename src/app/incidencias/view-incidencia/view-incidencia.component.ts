import {Component, Input, OnInit} from '@angular/core';
import {Incidente} from '../../models/incidente';

@Component({
  selector: 'app-view-incidencia',
  templateUrl: './view-incidencia.component.html',
  styleUrls: ['./view-incidencia.component.css']
})
export class ViewIncidenciaComponent implements OnInit {
  @Input() issueDetail!: Incidente;

  constructor() {
    console.log(this.issueDetail);
  }

  ngOnInit() {
    console.log(this.issueDetail);
  }
}
