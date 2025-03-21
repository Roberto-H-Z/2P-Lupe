import { Component, Input } from '@angular/core';
import { ForecastDay } from '@core/services/http.service';

@Component({
  selector: 'app-forecast',
  standalone: false,
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent {
  @Input() forecast: ForecastDay[] = [];

  getWeatherIcon(icon?: string): string {
    if (!icon) return 'icon-cloud';
    
    switch (icon.toLowerCase()) {
      case 'sunny': return 'icon-sun';
      case 'cloudy': return 'icon-cloud';
      case 'rainy': return 'icon-cloud-rain';
      case 'stormy': return 'icon-cloud-lightning';
      case 'windy': return 'icon-wind';
      case 'foggy': return 'icon-cloud-drizzle';
      default: return 'icon-cloud';
    }
  }

  getRiskClass(risk: string): string {
    switch (risk.toLowerCase()) {
      case "bajo": return "risk-low";
      case "moderado": return "risk-moderate";
      case "alto": return "risk-high";
      case "muy alto": return "risk-very-high";
      case "extremo": return "risk-extreme";
      default: return "";
    }
  }
}
