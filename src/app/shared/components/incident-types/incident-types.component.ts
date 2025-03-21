import { Component, Input } from '@angular/core';

interface IncidentType {
  name: string;
  count: number;
  percentage: number;
}

@Component({
  selector: 'app-incident-types',
  standalone: false,
  templateUrl: './incident-types.component.html',
  styleUrls: ['./incident-types.component.css']
})
export class IncidentTypesComponent {
  @Input() incidentTypes: IncidentType[] = [];

  getColorForType(typeName: string): string {
    const colors: {[key: string]: string} = {
      'Incendio': '#e53e3e',
      'Rescate': '#dd6b20',
      'Emergencia Médica': '#38a169',
      'Materiales Peligrosos': '#805ad5',
      'Desastre Natural': '#3182ce'
    };
    
    return colors[typeName] || '#718096';
  }
}
