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
    const generateRandomData = (length: number, min: number, max: number): number[] =>
      Array.from({length}, () => Math.floor(Math.random() * (max - min + 1)) + min);

    this.chartOptions = {
      series: [
        {
          name: '2024',
          data: generateRandomData(12, 10, 60) // datos históricos
        },
        {
          name: 'Predicción 2025',
          data: generateRandomData(12, 50, 120) // datos de predicción
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
          data: generateRandomData(12, 5, 30) // datos históricos
        },
        {
          name: 'Predicción 2025',
          data: generateRandomData(12, 20, 100) // datos de predicción
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
