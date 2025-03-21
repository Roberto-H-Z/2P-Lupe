import { Component, OnInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { HttpService } from '@core/services/http.service';
Chart.register(...registerables);

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  barPercentage?: number;
  categoryPercentage?: number;
}

@Component({
  selector: 'app-monthly-stats',
  standalone: false,
  templateUrl: './monthly-stats.component.html',
  styleUrls: ['./monthly-stats.component.css']
})
export class MonthlyStatsComponent implements OnInit {
  @Input() incidents: any[] = [];

  public monthlyIncidentsChartData: any = {
    labels: [],
    datasets: []
  };

  public monthlyIncidentsChartOptions: any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de Incidentes'
        }
      }
    }
  };

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.loadMonthlyIncidentsData();
  }

  loadMonthlyIncidentsData() {
    this.httpService.getMonthlyIncidents().subscribe(data => {
      this.monthlyIncidentsChartData = {
        labels: data.labels,
        datasets: data.datasets.map(dataset => ({
          ...dataset,
          backgroundColor: this.getDatasetColor(dataset.label),
          borderColor: this.getDatasetColor(dataset.label),
          borderWidth: 1,
          borderRadius: 4,
          barPercentage: 0.8,
          categoryPercentage: 0.8
        }))
      };
    });
  }

  private getDatasetColor(label: string): string {
    const colorMap: { [key: string]: string } = {
      'Incendios Estructurales': 'rgb(229, 62, 62)',
      'Incidentes Vehiculares': 'rgb(246, 173, 85)',
      'Emergencias Médicas': 'rgb(72, 187, 120)',
      'Materiales Peligrosos': 'rgb(66, 153, 225)',
      'Alertas de Incendios Forestales': 'rgb(159, 122, 234)'
    };
    return colorMap[label] || '#000000';
  }
}
