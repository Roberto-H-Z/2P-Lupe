import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Metadata {
  activeIncidents: number;
  totalUnits: number;
}

export interface Incident {
  id: number;
  type: string;
  location: string;
  time: string;
  units: number;
  status: string;
}

export interface IncidentType {
  id: number;
  name: string;
  count: number;
  percentage: number;
}

export interface ForecastDay {
  id: number;
  day: string;
  risk: string;
  temp: number;
  humidity?: number;
  windSpeed?: number;
  icon?: string;
  description?: string;
}

export interface ResponseTimeData {
  labels: string[];
  actualTimes: number[];
  targetTimes: number[];
}

export interface MonthlyIncidentsData {
  labels: string[];
  datasets: any[];
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

  // Fetch response time data
  getResponseTimeData(): Observable<ResponseTimeData> {
    return this.http.get<ResponseTimeData>(`${this.apiUrl}/responseTimeData`);
  }

  // Fetch monthly incidents data
  getMonthlyIncidents(): Observable<MonthlyIncidentsData> {
    return this.http.get<MonthlyIncidentsData>(`${this.apiUrl}/monthlyIncidents`);
  }
}