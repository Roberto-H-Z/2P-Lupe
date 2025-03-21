import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { IncidentsMapComponent } from './incidents-map/incidents-map.component';
import { IncidentTypesComponent } from './incident-types/incident-types.component';
import { MonthlyStatsComponent } from './monthly-stats/monthly-stats.component';
import { MetricsGridComponent } from './metrics-grid/metrics-grid.component';
import { ResponseTimeChartComponent } from './response-time-chart/response-time-chart.component';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { ForecastComponent } from './forecast/forecast.component';
import { FireRiskInfoComponent } from './fire-risk-info/fire-risk-info.component';

@NgModule({
  declarations: [
    DashboardHeaderComponent,
    IncidentsMapComponent,
    IncidentTypesComponent,
    MonthlyStatsComponent,
    MetricsGridComponent,
    ResponseTimeChartComponent,
    CurrentWeatherComponent,
    ForecastComponent,
    FireRiskInfoComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule
  ],
  exports: [
    DashboardHeaderComponent,
    IncidentsMapComponent,
    IncidentTypesComponent,
    MonthlyStatsComponent,
    MetricsGridComponent,
    ResponseTimeChartComponent,
    CurrentWeatherComponent,
    ForecastComponent,
    FireRiskInfoComponent
  ]
})
export class ComponentsModule { }
