import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css'],
  standalone: false
})
export class DashboardHeaderComponent {
  @Input() activeTab: string = 'map';
  @Output() tabChanged = new EventEmitter<string>();
  
  // Add the tabs property that's being used in the template
  tabs: {id: string, label: string}[] = [
    { id: 'map', label: 'Mapa' },
    { id: 'stats', label: 'Estadísticas' },
    { id: 'weather', label: 'Clima' }
  ];

  changeTab(tab: string) {
    this.tabChanged.emit(tab);
  }
}
