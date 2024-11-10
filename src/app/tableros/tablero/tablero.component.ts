import {Component, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgApexchartsModule} from 'ng-apexcharts';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {combineLatest, Subscription, take} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {IncidenciasService} from '../../services/incidencias.service';
import {AuthService} from '../../services/auth.service';
import {canales, Incidente, estados, prioridades, tipos, meses, IncidenteSerie} from '../../models/incidentes';
import {Usuario} from '../../models/usuario';
import {DEFAULT_FILTER, NINGUNO_FILTER} from '../../constants';
import {ChartBarsOptions, ChartPieOptions} from '../../models/tableros';
import {ROLES_NAME} from '../../models/users';

@Component({
  standalone: true,
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.scss'],
  imports: [CommonModule, NgApexchartsModule, ReactiveFormsModule]
})
export class TableroComponent implements OnInit, OnDestroy {
  public filterPath: string = undefined;
  private incidencias: Incidente[] = [];
  public clientesUsers: Usuario[] = [];
  public gestoresUsers: Usuario[] = [];
  public usuariosUsers: Usuario[] = [];
  /* CHART OPTIONS */
  public pieCanalesChartOptions!: Partial<ChartPieOptions>;
  public pieTipoChartOptions!: Partial<ChartPieOptions>;
  public pieEstadoChartOptions!: Partial<ChartPieOptions>;
  public piePrioridadChartOptions!: Partial<ChartPieOptions>;
  public barsIncidentsChartOptions!: Partial<ChartBarsOptions>;
  /* ------------------------------------ */
  public cliente = new FormControl(DEFAULT_FILTER);
  public gestor = new FormControl(DEFAULT_FILTER);
  public usuario = new FormControl(DEFAULT_FILTER);
  private subscriptions: Subscription[] = [];

  constructor(
    private incidenciasService: IncidenciasService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.subscriptions.push(this.activatedRoute.params.subscribe((params) => (this.filterPath = params['filtro'])));
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
          show: true,
          formatter: (val) => String(val)
        }
      },
      title: {
        text: 'Incidentes por mes en el año'
      }
    };
  }

  ngOnInit(): void {
    combineLatest([this.incidenciasService.getIncidencias(), this.authService.getAllUsers()])
      .pipe(take(1))
      .subscribe(([incidentes, usuarios]) => {
        this.incidencias = incidentes;
        this.clientesUsers = usuarios.filter((user) => user.rol.nombre === ROLES_NAME.cliente);
        this.gestoresUsers = usuarios.filter((user) => user.rol.nombre === ROLES_NAME.gestor);
        this.usuariosUsers = usuarios.filter((user) => user.rol.nombre === ROLES_NAME.usuario);
        this.pieCanalesChartOptions.series = this.getCanalesPieValues(incidentes, null, ROLES_NAME[this.filterPath]);
        this.pieTipoChartOptions.series = this.getTypesPieValues(incidentes, null, ROLES_NAME[this.filterPath]);
        this.pieEstadoChartOptions.series = this.getEstadosPieValues(incidentes, null, ROLES_NAME[this.filterPath]);
        this.piePrioridadChartOptions.series = this.getPrioridadesPieValues(incidentes, null, ROLES_NAME[this.filterPath]);
        this.barsIncidentsChartOptions.series = this.getIncidentesMeses(incidentes, null, ROLES_NAME[this.filterPath]);
      });
    this.subscriptions.push(
      this.cliente.valueChanges.subscribe((userId) => this.updateValuesFromFilters(userId, ROLES_NAME.cliente)),
      this.gestor.valueChanges.subscribe((userId) => this.updateValuesFromFilters(userId, ROLES_NAME.gestor)),
      this.usuario.valueChanges.subscribe((userId) => this.updateValuesFromFilters(userId, ROLES_NAME.usuario))
    );
  }

  private updateValuesFromFilters(userId: string, rol: ROLES_NAME) {
    this.pieCanalesChartOptions.series = this.getCanalesPieValues(this.incidencias, userId, rol);
    this.pieTipoChartOptions.series = this.getTypesPieValues(this.incidencias, userId, rol);
    this.pieEstadoChartOptions.series = this.getEstadosPieValues(this.incidencias, userId, rol);
    this.piePrioridadChartOptions.series = this.getPrioridadesPieValues(this.incidencias, userId, rol);
    this.barsIncidentsChartOptions.series = this.getIncidentesMeses(this.incidencias, userId, rol);
  }

  private getCanalesPieValues(incidentes: Incidente[], userId?: string, rol?: ROLES_NAME): number[] {
    if (userId === DEFAULT_FILTER) userId = null;
    if (!rol) rol = ROLES_NAME.cliente;
    enum canalesKey {
      'web' = 0,
      'email' = 1,
      'mobile' = 2
    }
    return incidentes.reduce(
      (acc, incidente) => {
        const newAcc = [...acc];
        if (!userId) newAcc[canalesKey[incidente.canal]] = newAcc[canalesKey[incidente.canal]] + 1;
        else if (userId !== NINGUNO_FILTER && userId === incidente[rol]?.id)
          newAcc[canalesKey[incidente.canal]] = newAcc[canalesKey[incidente.canal]] + 1;
        else if (userId === NINGUNO_FILTER && !incidente[rol]?.id)
          newAcc[canalesKey[incidente.canal]] = newAcc[canalesKey[incidente.canal]] + 1;
        return newAcc;
      },
      [0, 0, 0]
    );
  }

  private getTypesPieValues(incidentes: Incidente[], userId?: string, rol?: ROLES_NAME): number[] {
    if (userId === DEFAULT_FILTER) userId = null;
    if (!rol) rol = ROLES_NAME.cliente;
    enum tiposKey {
      'pqrs' = 0,
      'incidente' = 1
    }
    return incidentes.reduce(
      (acc, incidente) => {
        const newAcc = [...acc];
        if (!userId) newAcc[tiposKey[incidente.tipo]] = newAcc[tiposKey[incidente.tipo]] + 1;
        else if (userId !== NINGUNO_FILTER && userId === incidente[rol]?.id)
          newAcc[tiposKey[incidente.tipo]] = newAcc[tiposKey[incidente.tipo]] + 1;
        else if (userId === NINGUNO_FILTER && !incidente[rol]?.id) newAcc[tiposKey[incidente.tipo]] = newAcc[tiposKey[incidente.tipo]] + 1;
        return newAcc;
      },
      [0, 0]
    );
  }

  private getEstadosPieValues(incidentes: Incidente[], userId?: string, rol?: ROLES_NAME): number[] {
    if (userId === DEFAULT_FILTER) userId = null;
    if (!rol) rol = ROLES_NAME.cliente;
    enum estadosKey {
      abierto = 0,
      'en progreso' = 1,
      cerrado = 2
    }
    return incidentes.reduce(
      (acc, incidente) => {
        const newAcc = [...acc];
        if (!userId) newAcc[estadosKey[incidente.estado]] = newAcc[estadosKey[incidente.estado]] + 1;
        else if (userId !== NINGUNO_FILTER && userId === incidente[rol]?.id)
          newAcc[estadosKey[incidente.estado]] = newAcc[estadosKey[incidente.estado]] + 1;
        else if (userId === NINGUNO_FILTER && !incidente[rol]?.id)
          newAcc[estadosKey[incidente.estado]] = newAcc[estadosKey[incidente.estado]] + 1;
        return newAcc;
      },
      [0, 0, 0]
    );
  }

  private getPrioridadesPieValues(incidentes: Incidente[], userId?: string, rol?: ROLES_NAME): number[] {
    if (userId === DEFAULT_FILTER) userId = null;
    if (!rol) rol = ROLES_NAME.cliente;
    enum prioridadesKey {
      baja = 0,
      media = 1,
      alta = 2
    }
    return incidentes.reduce(
      (acc, incidente) => {
        const newAcc = [...acc];
        if (!userId) newAcc[prioridadesKey[incidente.prioridad]] = newAcc[prioridadesKey[incidente.prioridad]] + 1;
        else if (userId !== NINGUNO_FILTER && userId === incidente[rol]?.id)
          newAcc[prioridadesKey[incidente.prioridad]] = newAcc[prioridadesKey[incidente.prioridad]] + 1;
        else if (userId === NINGUNO_FILTER && !incidente[rol]?.id)
          newAcc[prioridadesKey[incidente.prioridad]] = newAcc[prioridadesKey[incidente.prioridad]] + 1;
        return newAcc;
      },
      [0, 0, 0]
    );
  }

  private getIncidentesMeses(incidentes: Incidente[], userId?: string, rol?: ROLES_NAME): IncidenteSerie[] {
    if (userId === DEFAULT_FILTER) userId = null;
    if (!rol) rol = ROLES_NAME.cliente;
    return [
      incidentes.reduce(
        (acc, incidente) => {
          const newData: number[] = [...acc.data];
          const mesIncidente: number = new Date(incidente.fechacreacion).getMonth();
          if (!userId) newData[mesIncidente] = newData[mesIncidente] + 1;
          else if (userId !== NINGUNO_FILTER && userId === incidente[rol]?.id) newData[mesIncidente] = newData[mesIncidente] + 1;
          else if (userId === NINGUNO_FILTER && !incidente[rol]?.id) newData[mesIncidente] = newData[mesIncidente] + 1;
          return {
            ...acc,
            data: [...newData]
          };
        },
        {name: 'Incidentes', data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]} as IncidenteSerie
      )
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
