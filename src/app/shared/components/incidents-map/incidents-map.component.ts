import { Component, Input, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { HttpService } from '@core/services/http.service';

// Define the Incident interface
export interface Incident {
  id: number;
  type: string;
  location: string;
  time: string;
  units: number;
  status: string;
  // We'll generate these coordinates since they're not in your db.json
  lat?: number;
  lng?: number;
}

// Define a window interface to avoid TypeScript errors
declare global {
  interface Window {
    initGoogleMap: () => void;
    google: any;
  }
}

@Component({
  selector: 'app-incidents-map',
  standalone: false,
  templateUrl: './incidents-map.component.html',
  styleUrls: ['./incidents-map.component.css']
})
export class IncidentsMapComponent implements OnInit, AfterViewInit {
  @Input() incidents: Incident[] = [];
  private map: any = null;
  private markers: any[] = [];
  
  // Default center coordinates (Córdoba, Veracruz, Mexico)
  private center = { lat: 18.8149534, lng: -96.7237554 };

  constructor(private httpService: HttpService, private ngZone: NgZone) {}

  ngOnInit() {
    // If no incidents are provided, load them
    if (!this.incidents || this.incidents.length === 0) {
      this.loadIncidents();
    }
  }

  ngAfterViewInit() {
    // Load Google Maps script dynamically
    this.loadGoogleMapsScript();
  }

  loadGoogleMapsScript() {
    // Check if the script is already loaded
    if (window.google && window.google.maps) {
      this.initMap();
      return;
    }

    const script = document.createElement('script');
    // Use a free API key or get one from https://developers.google.com/maps/documentation/javascript/get-api-key
    script.src = 'https://maps.googleapis.com/maps/api/js?callback=initGoogleMap';
    script.async = true;
    script.defer = true;
    
    // Define the callback function
    window.initGoogleMap = () => {
      this.ngZone.run(() => {
        this.initMap();
      });
    };
    
    document.head.appendChild(script);
  }

  initMap() {
    const mapElement = document.getElementById('google-map');
    if (!mapElement) return;

    this.map = new window.google.maps.Map(mapElement, {
      center: this.center,
      zoom: 14,
      styles: [
        // Optional: Add custom map styles here
      ]
    });

    // Add markers for incidents
    this.addIncidentMarkers();
  }

  loadIncidents() {
    this.httpService.getIncidents().subscribe(
      incidents => {
        this.incidents = incidents;
        // If map is already initialized, add markers
        if (this.map) {
          this.addIncidentMarkers();
        }
      }
    );
  }

  addIncidentMarkers() {
    if (!this.map || !this.incidents.length) return;
    
    // Clear existing markers
    this.clearMarkers();
    
    // Add new markers
    this.incidents.forEach(incident => {
      // Generate random coordinates near the center since they're not in your db.json
      const lat = this.center.lat + (Math.random() - 0.5) * 0.02;
      const lng = this.center.lng + (Math.random() - 0.5) * 0.02;
      
      const marker = new window.google.maps.Marker({
        position: { lat, lng },
        map: this.map,
        title: incident.type,
        icon: this.getMarkerIcon(incident.status)
      });
      
      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: this.createInfoWindowContent(incident)
      });
      
      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
      
      this.markers.push(marker);
    });
  }
  
  clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }
  
  getMarkerIcon(status: string): any {
    let color = '#e53e3e'; // Default red for active
    
    switch (status.toLowerCase()) {
      case 'resuelto':
        color = '#38a169'; // Green
        break;
      case 'monitoreo':
        color = '#dd6b20'; // Orange
        break;
    }
    
    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: color,
      fillOpacity: 0.9,
      strokeWeight: 2,
      strokeColor: '#ffffff',
      scale: 10
    };
  }
  
  createInfoWindowContent(incident: Incident): string {
    const statusClass = incident.status.toLowerCase() === 'activo' ? 'status-active' : 
                        incident.status.toLowerCase() === 'resuelto' ? 'status-resolved' : 
                        incident.status.toLowerCase() === 'monitoreo' ? 'status-monitoring' : '';
    
    const statusColor = incident.status.toLowerCase() === 'activo' ? '#e53e3e' : 
                        incident.status.toLowerCase() === 'resuelto' ? '#38a169' : 
                        incident.status.toLowerCase() === 'monitoreo' ? '#dd6b20' : '#718096';
    
    return `
      <div class="info-window ${statusClass}">
        <h4>${incident.type}</h4>
        <p><strong>Ubicación:</strong> ${incident.location}</p>
        <p><strong>Hora:</strong> ${incident.time}</p>
        <p><strong>Estado:</strong> <span style="color: ${statusColor}; font-weight: 700;">${incident.status}</span></p>
        <p><strong>Unidades:</strong> <span style="background-color: #4299e1; color: white; padding: 2px 8px; border-radius: 12px; font-weight: 700;">${incident.units}</span></p>
      </div>
    `;
  }
  
  getIncidentTypeIcon(type: string): string {
    const iconMap: {[key: string]: string} = {
      'Incendio estructural': 'icon-home',
      'Incendio vehicular': 'icon-truck',
      'Emergencia médica': 'icon-activity',
      'Fuga de gas': 'icon-alert-triangle',
      'Incendio eléctrico': 'icon-zap',
      'Alerta de incendio forestal': 'icon-tree'
    };
    
    return iconMap[type] || 'icon-map-pin';
  }

  getStatusClass(status: string): string {
    const statusMap: {[key: string]: string} = {
      'Activo': 'status-active',
      'Resuelto': 'status-resolved',
      'Monitoreo': 'status-monitoring'
    };
    
    return statusMap[status] || '';
  }
}
