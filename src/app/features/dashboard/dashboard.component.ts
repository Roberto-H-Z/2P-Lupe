import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(annotationPlugin);
import { HttpService } from '@core/services/http.service';

interface Incident {
  type: string;
  location: string;
  time: string;
  units: number;
  status: string;
}

interface IncidentType {
  name: string;
  count: number;
  percentage: number;
}

interface ForecastDay {
  day: string;
  risk: string;
  temp: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  activeIncidents: number = 0;
  activeTab: string = 'map';
  unitArray: number[] = Array(12).fill(0);
  
  incidents: Incident[] = [];
  incidentTypes: IncidentType[] = [];
  forecast: ForecastDay[] = [];

  public monthlyIncidentsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  public monthlyIncidentsChartOptions: ChartOptions<'bar'> = {
    // Existing chart options...
  };

  public responseTimeChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };

  public responseTimeChartOptions: ChartOptions<'line'> = {
    // Existing chart options...
  };

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.loadMetadata();
    this.loadIncidents();
    this.loadIncidentTypes();
    this.loadForecast();
    this.loadMonthlyIncidents();
    this.loadResponseTimeData();
  }

  private loadMetadata(): void {
    this.httpService.getMetadata().subscribe(
      metadata => {
        this.activeIncidents = metadata.activeIncidents;
        // You can handle totalUnits here if needed
      }
    );
  }

  private loadIncidents(): void {
    this.httpService.getIncidents().subscribe(
      incidents => this.incidents = incidents
    );
  }

  private loadIncidentTypes(): void {
    this.httpService.getIncidentTypes().subscribe(
      incidentTypes => this.incidentTypes = incidentTypes
    );
  }

  private loadForecast(): void {
    this.httpService.getForecast().subscribe(
      forecast => this.forecast = forecast
    );
  }

  private loadMonthlyIncidents(): void {
    this.httpService.getMonthlyIncidents().subscribe(
      monthlyIncidents => {
        this.monthlyIncidentsChartData = {
          labels: monthlyIncidents.labels,
          datasets: monthlyIncidents.datasets.map(dataset => ({
            ...dataset,
            backgroundColor: this.getDatasetColor(dataset.label),
            borderColor: this.getDatasetColor(dataset.label),
            borderWidth: 1,
            borderRadius: 4,
            barPercentage: 0.8,
            categoryPercentage: 0.8
          }))
        };
      }
    );
  }

  private loadResponseTimeData(): void {
    this.httpService.getResponseTimeData().subscribe(
      responseTimeData => {
        this.responseTimeChartData = {
          labels: responseTimeData.labels,
          datasets: responseTimeData.datasets.map((dataset, index) => ({
            ...dataset,
            fill: index === 0,
            tension: index === 0 ? 0.4 : 0,
            borderColor: index === 0 ? '#e53e3e' : '#718096',
            backgroundColor: index === 0 ? 'rgba(229, 62, 62, 0.1)' : 'transparent',
            borderWidth: 2,
            borderDash: index === 1 ? [5, 5] : [],
            pointRadius: index === 1 ? 0 : undefined,
            pointHoverRadius: index === 1 ? 0 : undefined
          }))
        };
      }
    );
  }

  // Helper method to get dataset colors
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

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getRiskClass(risk: string): string {
    switch (risk) {
      case "Bajo": return "riesgo-bajo";
      case "Moderado": return "riesgo-moderado";
      case "Alto": return "riesgo-alto";
      case "Muy Alto": return "riesgo-muy-alto";
      case "Extremo": return "riesgo-extremo";
      default: return "";
    }
  }
}