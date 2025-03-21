import { Component, OnInit } from '@angular/core';
import { HttpService, ForecastDay } from '@core/services/http.service';

// Update the Incident interface to match the one in incidents-map.component.ts
interface Incident {
  id: number;
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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  activeIncidents: number = 0;
  activeTab: string = 'map';
  unitArray: number[] = Array(12).fill(0);
  
  incidents: Incident[] = [];
  incidentTypes: IncidentType[] = [];
  forecast: ForecastDay[] = [];
  currentWeather: ForecastDay | null = null;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.loadIncidents();
    this.loadIncidentTypes();
    this.loadForecast();
  }

  public loadIncidents(): void {
    this.httpService.getIncidents().subscribe(
      incidents => {
        this.incidents = incidents;
        // Calculate active incidents dynamically from the incidents array
        this.activeIncidents = this.incidents.filter(incident => 
          incident.status.toLowerCase() === 'activo'
        ).length;
      }
    );
  }

  private loadIncidentTypes(): void {
    this.httpService.getIncidentTypes().subscribe(
      incidentTypes => this.incidentTypes = incidentTypes
    );
  }

  public loadForecast(): void {
    this.httpService.getForecast().subscribe(
      forecast => {
        this.forecast = forecast;
        // Set the first day as current weather
        if (forecast && forecast.length > 0) {
          this.currentWeather = forecast[0];
        }
      }
    );
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}