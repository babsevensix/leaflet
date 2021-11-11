import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import * as L from 'leaflet';
import { MappaService } from './services/mappa.service';

@Directive({
  selector: '[appLeafletMap]'
})
export class LeafletMapDirective implements AfterViewInit {
  _latlngs: L.LatLng[] = [];
  _markers: L.Marker[] = [];

  @Input() get latlngs() : L.LatLng[]
  {
    return this._latlngs;
  }
  set latlngs(value : L.LatLng[]){
    this._latlngs = value;
    console.log('setting latlngs');
    this.mappaService.setMarkers(this._latlngs);
  }

  @Output() mappaClicked: EventEmitter<L.LatLng> = new EventEmitter<L.LatLng>();
  @Output() markerClicked: EventEmitter<L.LatLng> = new EventEmitter<L.LatLng>();



  constructor(private elementRef: ElementRef, private mappaService: MappaService) { }
  ngAfterViewInit(): void {
    this.mappaService.initMappa(this.elementRef);
    this.mappaService.onMappaClicked.subscribe((e: any) => {

      this.mappaClicked.emit(e.latlng);
    });

    this.mappaService.onMarkerClicked.subscribe((e: any) => {

      this.markerClicked.emit(e);
    });
    this.mappaService.setMarkers(this._latlngs);
  }

  ngOnInit(): void {



    // this.mappa = L.map(this.elementRef.nativeElement,{ }).setView([41.934441, 12.493692], 5);
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: 'edupala.com © Angular LeafLet',
    // }).addTo(this.mappa);

    // this.mappa.on('click', (e: any) => {

    //   this.mappaClicked.emit(e.latlng);
    // });



    //this.setMarkers(this._latlngs);


  }


  // private setMarkers(latlngs: L.LatLng[]) {
  //   if (this.mappa ) {

  //     if (this._markers.length > 0) {
  //       this._markers.forEach(m => {
  //         (<L.Map>this.mappa).removeLayer(m);
  //       });
  //     }

  //     this._markers = latlngs.map(latlng => {
  //       const marker = L.marker(latlng).addTo(<L.Map>this.mappa);
  //       marker.on('click', () => {
  //         this.markerClicked.emit(latlng);
  //       });
  //       return marker;
  //     });
  //   }
  // }
}
