import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Directive({
  selector: '[appLeafletMap]'
})
export class LeafletMapDirective implements OnInit {
  _latlngs: L.LatLng[] = [];
  _markers: L.Marker[] = [];

  @Input() get latlngs() : L.LatLng[]
  {
    return this._latlngs;
  }
  set latlngs(value : L.LatLng[]){
    this._latlngs = value;
    console.log('setting latlngs');
    this.setMarkers(this._latlngs);
  }

  private mappa: L.Map |undefined;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {

      this.mappa = L.map(this.elementRef.nativeElement).setView([41.934441, 12.493692], 5);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'edupala.com © Angular LeafLet',
      }).addTo(this.mappa);

    this.setMarkers(this._latlngs);

  }


  private setMarkers(latlngs: L.LatLng[]) {
    if (this.mappa ) {
      this._markers = latlngs.map(latlng => {
        return L.marker(latlng).addTo(<L.Map>this.mappa);
      });
    }
  }
}
