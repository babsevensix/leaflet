import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() mappaClicked: EventEmitter<L.LatLng> = new EventEmitter<L.LatLng>();
  @Output() markerClicked: EventEmitter<L.LatLng> = new EventEmitter<L.LatLng>();

  private mappa: L.Map |undefined;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {

    this.mappa = L.map(this.elementRef.nativeElement,{ }).setView([41.934441, 12.493692], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.mappa);

    this.mappa.on('click', (e: any) => {

      this.mappaClicked.emit(e.latlng);
    });

    this.setMarkers(this._latlngs);

  }


  private setMarkers(latlngs: L.LatLng[]) {
    if (this.mappa ) {

      if (this._markers.length > 0) {
        this._markers.forEach(m => {
          (<L.Map>this.mappa).removeLayer(m);
        });
      }

      this._markers = latlngs.map(latlng => {
        const marker = L.marker(latlng).addTo(<L.Map>this.mappa);
        marker.on('click', () => {
          this.markerClicked.emit(latlng);
        });
        return marker;
      });
    }
  }
}
