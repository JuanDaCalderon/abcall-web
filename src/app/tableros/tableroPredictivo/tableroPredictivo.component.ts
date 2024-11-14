import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgApexchartsModule} from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ApexTooltip,
  ApexGrid,
  ApexFill
} from 'ng-apexcharts';
@Component({
  standalone: true,
  selector: 'app-tablero-predictivo',
  templateUrl: './tableroPredictivo.component.html',
  styleUrls: ['./tableroPredictivo.component.css'],
  imports: [CommonModule, NgApexchartsModule]
})
export class TableroPredictivoComponent {
  public chartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    dataLabels: ApexDataLabels;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
    tooltip: ApexTooltip;
    grid: ApexGrid;
    fill: ApexFill;
  };

  public chartOptions2: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    dataLabels: ApexDataLabels;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
    tooltip: ApexTooltip;
    grid: ApexGrid;
    fill: ApexFill;
  };
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: '2024',
          data: [45, 52, 38, 45, 19, 23, 25, 26, 30, 33, 15, 55] // datos históricos
        },
        {
          name: 'Predicción 2025',
          data: [31, 40, 28, 51, 42, 109, 100, 101, 102, 103, 104, 99] // datos de predicción
        }
      ],
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: [3, 3],
        dashArray: [0, 5] // predicción con línea discontinua
      },
      title: {
        text: 'Indicador de Incidentes Predictivo',
        align: 'left'
      },
      xaxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'], // Etiquetas de tiempo
        title: {
          text: 'Meses'
        }
      },
      yaxis: {
        title: {
          text: 'Incidentes'
        }
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      grid: {
        borderColor: '#f1f1f1'
      },
      fill: {
        opacity: [0.85, 0.25],
        type: 'solid'
      }
    };

    this.chartOptions2 = {
      series: [
        {
          name: '2024',
          data: [5, 12, 15, 23, 12, 13, 25, 26, 10, 23, 15, 30] // datos históricos
        },
        {
          name: 'Predicción 2025',
          data: [11, 20, 18, 21, 22, 59, 62, 70, 71, 69, 68, 88] // datos de predicción
        }
      ],
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: [3, 3],
        dashArray: [0, 5] // predicción con línea discontinua
      },
      title: {
        text: 'Indicador de PQRS Predictivo',
        align: 'left'
      },
      xaxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic'], // Etiquetas de tiempo
        title: {
          text: 'Meses'
        }
      },
      yaxis: {
        title: {
          text: 'PQRS'
        }
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      grid: {
        borderColor: '#f1f1f1'
      },
      fill: {
        opacity: [0.85, 0.25],
        type: 'solid'
      }
    };
  }
}
