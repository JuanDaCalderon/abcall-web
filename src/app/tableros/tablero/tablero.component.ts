import {CommonModule} from '@angular/common';
import {NgApexchartsModule} from 'ng-apexcharts';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {IncidenciasService} from '../../services/incidencias.service';
import {AuthService} from '../../services/auth.service';
import {combineLatest, Subscription, take} from 'rxjs';
import {canales, Incidente, estados, prioridades, tipos, meses, IncidenteSerie} from '../../models/incidentes';
import {Usuario} from '../../models/usuario';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {DEFAULT_FILTER} from '../../constants';
import {ChartBarsOptions, ChartPieOptions} from '../../models/tableros';

@Component({
  standalone: true,
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss'],
  imports: [CommonModule, NgApexchartsModule, ReactiveFormsModule]
})
export class TableroComponent implements OnInit, OnDestroy {
  private incidencias: Incidente[] = [];
  public clientesUsers: Usuario[] = [];
  /* CHART OPTIONS */
  public pieCanalesChartOptions!: Partial<ChartPieOptions>;
  public pieTipoChartOptions!: Partial<ChartPieOptions>;
  public pieEstadoChartOptions!: Partial<ChartPieOptions>;
  public piePrioridadChartOptions!: Partial<ChartPieOptions>;
  public barsIncidentsChartOptions!: Partial<ChartBarsOptions>;
  /* ------------------------------------ */
  public cliente = new FormControl(DEFAULT_FILTER);
  private subscriptions: Subscription[] = [];

  constructor(
    private incidenciasService: IncidenciasService,
    private authService: AuthService
  ) {
    this.pieCanalesChartOptions = {
      series: [0],
      chart: {
        width: 420,
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
        width: 420,
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
        width: 420,
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
        width: 420,
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
        height: 400,
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
        //formatter: (val) => String(val),
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
          show: true,
          formatter: (val) => String(val)
        }
      },
      title: {
        text: 'Incidentes por mes en el año'
      }
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngOnInit(): void {
    combineLatest([this.incidenciasService.getIncidencias(), this.authService.getAllUsers()])
      .pipe(take(1))
      .subscribe(([incidentes, usuarios]) => {
        this.incidencias = incidentes;
        this.clientesUsers = usuarios.filter((user) => user.rol.nombre === 'cliente');
        this.pieCanalesChartOptions.series = this.getCanalesPieValues(incidentes);
        this.pieTipoChartOptions.series = this.getTypesPieValues(incidentes);
        this.pieEstadoChartOptions.series = this.getEstadosPieValues(incidentes);
        this.piePrioridadChartOptions.series = this.getPrioridadesPieValues(incidentes);
        this.barsIncidentsChartOptions.series = this.getIncidentesMeses(incidentes);
      });
    this.subscriptions.push(
      this.cliente.valueChanges.subscribe((userId) => {
        this.pieCanalesChartOptions.series = this.getCanalesPieValues(this.incidencias, userId);
        this.pieTipoChartOptions.series = this.getTypesPieValues(this.incidencias, userId);
        this.pieEstadoChartOptions.series = this.getEstadosPieValues(this.incidencias, userId);
        this.piePrioridadChartOptions.series = this.getPrioridadesPieValues(this.incidencias, userId);
        this.barsIncidentsChartOptions.series = this.getIncidentesMeses(this.incidencias, userId);
      })
    );
  }

  private getCanalesPieValues(incidentes: Incidente[], userId?: string): number[] {
    if (userId === DEFAULT_FILTER) userId = null;
    enum canalesKey {
      'web' = 0,
      'email' = 1,
      'mobile' = 2
    }
    return incidentes.reduce(
      (acc, incidente) => {
        const newAcc = [...acc];
        if (!userId) newAcc[canalesKey[incidente.canal]] = newAcc[canalesKey[incidente.canal]] + 1;
        else if (userId === incidente.cliente.id) newAcc[canalesKey[incidente.canal]] = newAcc[canalesKey[incidente.canal]] + 1;
        return newAcc;
      },
      [0, 0, 0]
    );
  }

  private getTypesPieValues(incidentes: Incidente[], userId?: string): number[] {
    if (userId === DEFAULT_FILTER) userId = null;
    enum tiposKey {
      'pqrs' = 0,
      'incidente' = 1
    }
    return incidentes.reduce(
      (acc, incidente) => {
        const newAcc = [...acc];
        if (!userId) newAcc[tiposKey[incidente.tipo]] = newAcc[tiposKey[incidente.tipo]] + 1;
        else if (userId === incidente.cliente.id) newAcc[tiposKey[incidente.tipo]] = newAcc[tiposKey[incidente.tipo]] + 1;
        return newAcc;
      },
      [0, 0]
    );
  }

  private getEstadosPieValues(incidentes: Incidente[], userId?: string): number[] {
    if (userId === DEFAULT_FILTER) userId = null;
    enum estadosKey {
      abierto = 0,
      'en progreso' = 1,
      cerrado = 2
    }
    return incidentes.reduce(
      (acc, incidente) => {
        const newAcc = [...acc];
        if (!userId) newAcc[estadosKey[incidente.estado]] = newAcc[estadosKey[incidente.estado]] + 1;
        else if (userId === incidente.cliente.id) newAcc[estadosKey[incidente.estado]] = newAcc[estadosKey[incidente.estado]] + 1;
        return newAcc;
      },
      [0, 0, 0]
    );
  }

  private getPrioridadesPieValues(incidentes: Incidente[], userId?: string): number[] {
    if (userId === DEFAULT_FILTER) userId = null;
    enum prioridadesKey {
      baja = 0,
      media = 1,
      alta = 2
    }
    return incidentes.reduce(
      (acc, incidente) => {
        const newAcc = [...acc];
        if (!userId) newAcc[prioridadesKey[incidente.prioridad]] = newAcc[prioridadesKey[incidente.prioridad]] + 1;
        else if (userId === incidente.cliente.id)
          newAcc[prioridadesKey[incidente.prioridad]] = newAcc[prioridadesKey[incidente.prioridad]] + 1;
        return newAcc;
      },
      [0, 0, 0]
    );
  }

  private getIncidentesMeses(incidentes: Incidente[], userId?: string): IncidenteSerie[] {
    if (userId === DEFAULT_FILTER) userId = null;
    return [
      incidentes.reduce(
        (acc, incidente) => {
          const newData: number[] = [...acc.data];
          const mesIncidente: number = new Date(incidente.fechacreacion).getMonth();
          if (!userId) newData[mesIncidente] = newData[mesIncidente] + 1;
          else if (userId === incidente.cliente.id) newData[mesIncidente] = newData[mesIncidente] + 1;
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
