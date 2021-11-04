import { Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  latLngs: L.LatLng[] = [L.latLng(41.8901622,12.4998408)];
}
