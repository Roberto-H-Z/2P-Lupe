import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpService } from '@core/services/http.service';
Chart.register(...registerables);

interface ChartDataset {
  label: string;
  data: number[];
  fill?: boolean;
  tension?: number;
  borderColor?: string;
  borderDash?: number[];
}

@Component({
  selector: 'app-response-time-chart',
  standalone: false,
  templateUrl: './response-time-chart.component.html',
  styleUrls: ['./response-time-chart.component.css']
})
export class ResponseTimeChartComponent implements OnInit {
  public responseTimeChartData: any = {
    labels: [],
    datasets: []
  };

  public responseTimeChartOptions: any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Tiempo de Respuesta (minutos)'
        }
      }
    }
  };

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.loadResponseTimeData();
  }

  loadResponseTimeData() {
    this.httpService.getResponseTimeData().subscribe(data => {
      this.responseTimeChartData = {
        labels: data.labels,
        datasets: [
          {
            label: 'Tiempo de Respuesta Actual',
            data: data.actualTimes,
            fill: false,
            tension: 0.1,
            borderColor: 'rgb(75, 192, 192)'
          },
          {
            label: 'Tiempo de Respuesta Objetivo',
            data: data.targetTimes,
            fill: false,
            borderColor: 'rgb(255, 99, 132)',
            borderDash: [5, 5]
          }
        ]
      };
    });
  }
}
