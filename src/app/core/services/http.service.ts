import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Metadata {
  activeIncidents: number;
  totalUnits: number;
}

interface Incident {
  id: number;
  type: string;
  location: string;
  time: string;
  units: number;
  status: string;
}

interface IncidentType {
  id: number;
  name: string;
  count: number;
  percentage: number;
}

interface ForecastDay {
  id: number;
  day: string;
  risk: string;
  temp: number;
}

interface MonthlyIncidents {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
  }>;
}

interface ResponseTimeData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  // Fetch metadata
  getMetadata(): Observable<Metadata> {
    return this.http.get<Metadata>(`${this.apiUrl}/metadata`);
  }

  // Fetch incidents
  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${this.apiUrl}/incidents`);
  }

  // Fetch incident types
  getIncidentTypes(): Observable<IncidentType[]> {
    return this.http.get<IncidentType[]>(`${this.apiUrl}/incidentTypes`);
  }

  // Fetch forecast
  getForecast(): Observable<ForecastDay[]> {
    return this.http.get<ForecastDay[]>(`${this.apiUrl}/forecast`);
  }

  // Fetch monthly incidents chart data
  getMonthlyIncidents(): Observable<MonthlyIncidents> {
    return this.http.get<MonthlyIncidents>(`${this.apiUrl}/monthlyIncidents`);
  }

  // Fetch response time chart data
  getResponseTimeData(): Observable<ResponseTimeData> {
    return this.http.get<ResponseTimeData>(`${this.apiUrl}/responseTime`);
  }
}