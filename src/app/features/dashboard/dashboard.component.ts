import { Component, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common"
import { trigger, state, style, animate, transition } from "@angular/animations"
import { Input } from "@angular/core"
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(annotationPlugin);
import {  OnInit } from '@angular/core';


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
export class DashboardComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  activeIncidents: number = 3;
  activeTab: string = 'map';
  unitArray: number[] = Array(12).fill(0);
  

  


  public monthlyIncidentsChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        data: [12, 15, 8, 7],
        label: 'Incendios Estructurales',
        backgroundColor: 'rgba(229, 62, 62, 0.8)',
        borderColor: 'rgb(229, 62, 62)',
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.8
      },
      {
        data: [8, 7, 6, 7],
        label: 'Incidentes Vehiculares',
        backgroundColor: 'rgba(246, 173, 85, 0.8)',
        borderColor: 'rgb(246, 173, 85)',
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.8
      },
      {
        data: [9, 10, 8, 8],
        label: 'Emergencias Médicas',
        backgroundColor: 'rgba(72, 187, 120, 0.8)',
        borderColor: 'rgb(72, 187, 120)',
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.8
      },
      {
        data: [3, 4, 2, 3],
        label: 'Materiales Peligrosos',
        backgroundColor: 'rgba(66, 153, 225, 0.8)',
        borderColor: 'rgb(66, 153, 225)',
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.8
      },
      {
        data: [2, 3, 3, 2],
        label: 'Alertas de Incendios Forestales',
        backgroundColor: 'rgba(159, 122, 234, 0.8)',
        borderColor: 'rgb(159, 122, 234)',
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 0.8,
        categoryPercentage: 0.8
      }
    ]
  };

  // Opciones para el gráfico de incidentes mensuales
  public monthlyIncidentsChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        },
        stacked: false,
        title: {
          display: true,
          text: 'Abril 2025'
        }
      },
      y: {
        stacked: false,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de Incidentes'
        },
        ticks: {
          stepSize: 5
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'rectRounded'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          footer: function(tooltipItems) {
            let sum = 0;
            tooltipItems.forEach(function(tooltipItem) {
              sum += tooltipItem.parsed.y;
            });
            return 'Total: ' + sum + ' incidentes';
          }
        }
      }
    }
  };

  // Método para calcular el total de incidentes por semana
  public getTotalIncidentsByWeek(): number[] {
    const totals: number[] = [];
    const datasets = this.monthlyIncidentsChartData.datasets;
    const weeks = datasets[0].data.length;
    
    for (let i = 0; i < weeks; i++) {
      let weekTotal = 0;
      datasets.forEach(dataset => {
        weekTotal += dataset.data[i] as number;
      });
      totals.push(weekTotal);
    }
    
    return totals;
  }

  // Método para calcular el total de incidentes por tipo
  public getTotalIncidentsByType(): { name: string, count: number }[] {
    const totals: { name: string, count: number }[] = [];
    
    this.monthlyIncidentsChartData.datasets.forEach(dataset => {
      const total = (dataset.data as number[]).reduce((sum, value) => sum + value, 0);
      totals.push({
        name: dataset.label || '',
        count: total
      });
    });
    
    return totals;
  }




  public responseTimeChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false,
        min: 3,
        max: 7,
        title: {
          display: true,
          text: 'Minutos'
        },
        ticks: {
          stepSize: 1
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
    plugins: {
      
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 12,
          usePointStyle: true
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + context.parsed.y + ' min';
          }
        }
      },
      annotation: {
        annotations: {
          improvement: {
            type: 'line',
            yMin: 5.2,
            yMax: 4.2,
            xMin: 0,
            xMax: 6,
            borderColor: 'rgba(75, 192, 192, 0.5)',
            borderWidth: 2,
            label: {
              content: '↓ 19% mejora',
              position: 'start',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              color: '#fff',
              font: {
                size: 12
              }
            }
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    }
  };

  public responseTimeChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        data: [5.2, 4.8, 4.5, 4.3, 4.6, 4.1, 4.2],
        label: 'Tiempo de respuesta (min)',
        fill: true,
        tension: 0.4,
        borderColor: '#e53e3e',
        backgroundColor: 'rgba(229, 62, 62, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: '#e53e3e',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#e53e3e'
      },
      {
        data: [6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0],
        label: 'Objetivo',
        borderDash: [5, 5],
        fill: false,
        tension: 0,
        borderColor: '#718096',
        backgroundColor: 'transparent',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0
      }
    ]
  };

  incidents: Incident[] = [
    {
      type: "Incendio estructural",
      location: "123 Calle Principal, Centro",
      time: "10:32 AM",
      units: 3,
      status: "Activo"
    },
    {
      type: "Incendio vehicular",
      location: "Autopista 101, Kilómetro 45",
      time: "9:15 AM",
      units: 1,
      status: "Activo"
    },
    {
      type: "Emergencia médica",
      location: "45 Avenida Roble, Oeste",
      time: "8:50 AM",
      units: 1,
      status: "Resuelto"
    },
    {
      type: "Fuga de gas",
      location: "78 Calle Pino, Norte",
      time: "7:22 AM",
      units: 2,
      status: "Resuelto"
    },
    {
      type: "Incendio eléctrico",
      location: "Distrito Comercial, Torre B",
      time: "Ayer, 11:45 PM",
      units: 4,
      status: "Resuelto"
    },
    {
      type: "Alerta de incendio forestal",
      location: "Colinas del Norte, Sector 7",
      time: "Ayer, 6:30 PM",
      units: 5,
      status: "Monitoreo"
    }
];

incidentTypes: IncidentType[] = [
    { name: "Incendios estructurales", count: 42, percentage: 33 },
    { name: "Incidentes vehiculares", count: 28, percentage: 22 },
    { name: "Emergencias médicas", count: 35, percentage: 28 },
    { name: "Materiales peligrosos", count: 12, percentage: 9 },
    { name: "Alertas de incendio forestal", count: 10, percentage: 8 }
];

forecast: ForecastDay[] = [
    { day: "Lun", risk: "Alto", temp: 33 },
    { day: "Mar", risk: "Muy Alto", temp: 35 },
    { day: "Mié", risk: "Alto", temp: 32 },
    { day: "Jue", risk: "Moderado", temp: 28 },
    { day: "Vie", risk: "Bajo", temp: 25 }
];

constructor() { }

ngOnInit(): void {
    // Tu código existente...
    
    // Actualiza los datos de incidentTypes basados en el gráfico
    this.incidentTypes = this.getTotalIncidentsByType().map(type => {
      const totalIncidents = 127; // Total de incidentes
      const percentage = Math.round((type.count / totalIncidents) * 100);
      return {
        name: type.name,
        count: type.count,
        percentage: percentage
      };
    });
  }


setActiveTab(tab: string): void {
    this.activeTab = tab;
}

getRiskClass(risk: string): string {
    switch (risk) {
        case "Bajo":
            return "riesgo-bajo";
        case "Moderado":
            return "riesgo-moderado";
        case "Alto":
            return "riesgo-alto";
        case "Muy Alto":
            return "riesgo-muy-alto";
        case "Extremo":
            return "riesgo-extremo";
        default:
            return "";
    }
}
}
