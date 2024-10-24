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
        incidencia.usuario.nombres.toLowerCase().includes(criterio.toLowerCase()) ||
        incidencia.usuario.apellidos.toLowerCase().includes(criterio.toLowerCase()) ||
        incidencia.cliente.nombres.toLowerCase().includes(criterio.toLowerCase()) ||
        incidencia.cliente.apellidos.toLowerCase().includes(criterio.toLowerCase())
    );
  }
}
