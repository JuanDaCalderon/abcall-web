import {Pipe, PipeTransform} from '@angular/core';
import {Incidente} from '../models/incidentes';

@Pipe({
  name: 'filtroIncidencias',
  standalone: true
})
export class FiltroIncidenciasPipe implements PipeTransform {
  transform(incidencias: Incidente[], criterio: string): Incidente[] {
    if (!incidencias || !criterio) {
      return incidencias;
    }
    return incidencias.filter(
      (incidencia) =>
        incidencia.USUARIO.toLowerCase().includes(criterio.toLowerCase()) ||
        incidencia.CLIENTE.toLowerCase().includes(criterio.toLowerCase())
    );
  }
}
