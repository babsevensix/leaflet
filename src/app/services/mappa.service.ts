import { ElementRef, Injectable } from '@angular/core';
import * as L from 'leaflet';
import { map } from 'rxjs/operators';
import { PuntoSullamappa } from 'src/puntosullamappa.model';
import { PuntiMappaService } from './punti-mappa.service';

@Injectable({
  providedIn: 'root'
})
export class MappaService {



  private _markers: L.Marker[] = [];


  private mappa: L.Map | undefined;

  constructor(private puntiMappaService: PuntiMappaService) {

  }


  initMappa(element: ElementRef): void {

    this.mappa = L.map(element.nativeElement, {
      center: [41.89, 12.49],
      zoom: 15
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.mappa);


    this.puntiMappaService.getPuntiMappa$()
      .pipe(
        map(punti => {
          this.clearAllMarkers();
          return punti.map(p => {
            return this.addMarkerToMap(p);
          });
        })
      )
      .subscribe(markers => {
        this._markers = markers;

      }
      );
    this.mappa.on('click', (e: any) => {

      this.puntiMappaService.addPuntoMappa(e.latlng);
    });
  }

  private addMarkerToMap(puntoSullaMappa: PuntoSullamappa): L.Marker {
    return L.marker(puntoSullaMappa.point)
      .addTo(<L.Map>this.mappa)
      .on('click', () => {

        this.puntiMappaService.removePuntoMappa(puntoSullaMappa);

      });
  }

  private clearAllMarkers() {
    this._markers.forEach(m => {
      (<L.Map>this.mappa).removeLayer(m);
    });
  }
}
