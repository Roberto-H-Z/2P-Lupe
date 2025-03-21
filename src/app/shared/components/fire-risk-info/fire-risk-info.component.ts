import { Component } from '@angular/core';

@Component({
  selector: 'app-fire-risk-info',
  standalone: false,
  templateUrl: './fire-risk-info.component.html',
  styleUrls: ['./fire-risk-info.component.css']
})
export class FireRiskInfoComponent {
  riskLevels = [
    {
      level: 'Bajo',
      description: 'Condiciones favorables. Bajo riesgo de incendios.',
      class: 'risk-low'
    },
    {
      level: 'Moderado',
      description: 'Precaución recomendada en actividades al aire libre.',
      class: 'risk-moderate'
    },
    {
      level: 'Alto',
      description: 'Evitar actividades que puedan generar chispas o fuego.',
      class: 'risk-high'
    },
    {
      level: 'Muy Alto',
      description: 'Restricciones en actividades al aire libre. Alerta.',
      class: 'risk-very-high'
    },
    {
      level: 'Extremo',
      description: 'Máxima alerta. Prohibición de actividades de riesgo.',
      class: 'risk-extreme'
    }
  ];
}
