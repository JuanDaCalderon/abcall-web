import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgApexchartsModule} from 'ng-apexcharts';
import {ReactiveFormsModule} from '@angular/forms';
import {take} from 'rxjs';
import {IncidenciasService} from '../../services/incidencias.service';
import {AuthService} from '../../services/auth.service';
import {ChartBarsOptions, ChartPieOptions} from '../../models/tableros';
import {canales, estados, Incidente, IncidenteSerie, meses, prioridades, tipos} from '../../models/incidentes';
import {Usuario} from '../../models/usuario';
import {ROLES_NAME} from '../../models/users';

@Component({
  standalone: true,
  selector: 'app-mi-tablero',
  templateUrl: './mi-tablero.component.html',
  styleUrls: ['./mi-tablero.component.scss'],
  imports: [CommonModule, NgApexchartsModule, ReactiveFormsModule]
})
export class MiTableroComponent implements OnInit {
  public usuario: Usuario;
  public pieCanalesChartOptions!: Partial<ChartPieOptions>;
  public pieTipoChartOptions!: Partial<ChartPieOptions>;
  public pieEstadoChartOptions!: Partial<ChartPieOptions>;
  public piePrioridadChartOptions!: Partial<ChartPieOptions>;
  public barsIncidentsChartOptions!: Partial<ChartBarsOptions>;
  constructor(
    private incidenciasService: IncidenciasService,
    private authService: AuthService
  ) {
    this.usuario = this.authService.getUsuario();
    this.pieCanalesChartOptions = {
      series: [0],
      chart: {
        width: 400,
        type: 'pie',
        toolbar: {
          show: true
        }
      },
      labels: canales,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ],
      title: {
        text: 'Incidentes por canales'
      }
    };
    this.pieTipoChartOptions = {
      series: [0],
      chart: {
        width: 400,
        type: 'pie',
        toolbar: {
          show: true
        }
      },
      labels: tipos,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ],
      title: {
        text: 'Incidentes por tipo'
      }
    };
    this.pieEstadoChartOptions = {
      series: [0],
      chart: {
        width: 400,
        type: 'pie',
        toolbar: {
          show: true
        }
      },
      labels: estados,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ],
      title: {
        text: 'Incidentes por estado'
      }
    };
    this.piePrioridadChartOptions = {
      series: [0],
      chart: {
        width: 400,
        type: 'pie',
        toolbar: {
          show: true
        }
      },
      labels: prioridades,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ],
      title: {
        text: 'Incidentes por prioridad'
      }
    };
    this.barsIncidentsChartOptions = {
      series: [
        {
          name: 'Incidentes',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
      ],
      chart: {
        height: 360,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758']
        }
      },
      xaxis: {
        categories: meses
      },
      yaxis: {
        labels: {
          show: true
        }
      },
      title: {
        text: 'Incidentes por mes en el año'
      }
    };
  }

  ngOnInit() {
    this.incidenciasService
      .getIncidencias()
      .pipe(take(1))
      .subscribe((incidentes) => {
        this.pieCanalesChartOptions.series = this.getCanalesPieValues(incidentes, this.usuario?.id, ROLES_NAME[this.usuario?.rol.nombre]);
        this.pieTipoChartOptions.series = this.getTypesPieValues(incidentes, this.usuario?.id, ROLES_NAME[this.usuario?.rol.nombre]);
        this.pieEstadoChartOptions.series = this.getEstadosPieValues(incidentes, this.usuario?.id, ROLES_NAME[this.usuario?.rol.nombre]);
        this.piePrioridadChartOptions.series = this.getPrioridadesPieValues(
          incidentes,
          this.usuario?.id,
          ROLES_NAME[this.usuario?.rol.nombre]
        );
        this.barsIncidentsChartOptions.series = this.getIncidentesMeses(incidentes, this.usuario?.id, ROLES_NAME[this.usuario?.rol.nombre]);
      });
  }

  private getCanalesPieValues(incidentes: Incidente[], userId: string, rol: ROLES_NAME): number[] {
    enum canalesKey {
      'web' = 0,
      'email' = 1,
      'mobile' = 2
    }
    return incidentes.reduce(
      (acc, incidente) => {
        const newAcc = [...acc];
        if (!userId) newAcc[canalesKey[incidente.canal]] = newAcc[canalesKey[incidente.canal]] + 1;
        else if (userId === incidente[rol]?.id) newAcc[canalesKey[incidente.canal]] = newAcc[canalesKey[incidente.canal]] + 1;
        return newAcc;
      },
      [0, 0, 0]
    );
  }

  private getTypesPieValues(incidentes: Incidente[], userId: string, rol: ROLES_NAME): number[] {
    enum tiposKey {
      'pqrs' = 0,
      'incidente' = 1
    }
    return incidentes.reduce(
      (acc, incidente) => {
        const newAcc = [...acc];
        if (!userId) newAcc[tiposKey[incidente.tipo]] = newAcc[tiposKey[incidente.tipo]] + 1;
        else if (userId === incidente[rol]?.id) newAcc[tiposKey[incidente.tipo]] = newAcc[tiposKey[incidente.tipo]] + 1;
        return newAcc;
      },
      [0, 0]
    );
  }

  private getEstadosPieValues(incidentes: Incidente[], userId: string, rol: ROLES_NAME): number[] {
    enum estadosKey {
      abierto = 0,
      'en progreso' = 1,
      cerrado = 2
    }
    return incidentes.reduce(
      (acc, incidente) => {
        const newAcc = [...acc];
        if (!userId) newAcc[estadosKey[incidente.estado]] = newAcc[estadosKey[incidente.estado]] + 1;
        else if (userId === incidente[rol]?.id) newAcc[estadosKey[incidente.estado]] = newAcc[estadosKey[incidente.estado]] + 1;
        return newAcc;
      },
      [0, 0, 0]
    );
  }

  private getPrioridadesPieValues(incidentes: Incidente[], userId: string, rol: ROLES_NAME): number[] {
    enum prioridadesKey {
      baja = 0,
      media = 1,
      alta = 2
    }
    return incidentes.reduce(
      (acc, incidente) => {
        const newAcc = [...acc];
        if (!userId) newAcc[prioridadesKey[incidente.prioridad]] = newAcc[prioridadesKey[incidente.prioridad]] + 1;
        else if (userId === incidente[rol]?.id)
          newAcc[prioridadesKey[incidente.prioridad]] = newAcc[prioridadesKey[incidente.prioridad]] + 1;
        return newAcc;
      },
      [0, 0, 0]
    );
  }

  private getIncidentesMeses(incidentes: Incidente[], userId: string, rol: ROLES_NAME): IncidenteSerie[] {
    return [
      incidentes.reduce(
        (acc, incidente) => {
          const newData: number[] = [...acc.data];
          const mesIncidente: number = new Date(incidente.fechacreacion).getMonth();
          if (!userId) newData[mesIncidente] = newData[mesIncidente] + 1;
          else if (userId === incidente[rol]?.id) newData[mesIncidente] = newData[mesIncidente] + 1;
          return {
            ...acc,
            data: [...newData]
          };
        },
        {name: 'Incidentes', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]} as IncidenteSerie
      )
    ];
  }
}
