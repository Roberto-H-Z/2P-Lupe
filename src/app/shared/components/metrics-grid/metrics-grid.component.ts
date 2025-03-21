import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '@core/services/http.service';

interface IncidentType {
  name: string;
  count: number;
  percentage: number;
}

@Component({
  selector: 'app-metrics-grid',
  standalone: false,
  templateUrl: './metrics-grid.component.html',
  styleUrls: ['./metrics-grid.component.css']
})
export class MetricsGridComponent implements OnInit {
  @Input() activeIncidents: number = 0;
  @Input() unitArray: number[] = Array(12).fill(0);
  
  incidentTypes: IncidentType[] = [];

  constructor(private httpService: HttpService) {}

  ngOnInit() {
    this.loadIncidentTypes();
  }

  loadIncidentTypes() {
    this.httpService.getIncidentTypes().subscribe(
      data => this.incidentTypes = data
    );
  }

  getStatusClass(type: IncidentType): string {
    if (type.percentage > 50) return 'status-critical';
    if (type.percentage > 30) return 'status-warning';
    return 'status-normal';
  }

  getIconForType(typeName: string): string {
    const icons: {[key: string]: string} = {
      'Incendio': 'icon-flame',
      'Rescate': 'icon-life-buoy',
      'Emergencia Médica': 'icon-activity',
      'Materiales Peligrosos': 'icon-alert-triangle',
      'Desastre Natural': 'icon-wind'
    };
    
    return icons[typeName] || 'icon-alert-circle';
  }
}
