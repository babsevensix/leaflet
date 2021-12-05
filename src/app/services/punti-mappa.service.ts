import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Observable, Subject } from 'rxjs';
import { PuntoSullamappa } from 'src/puntosullamappa.model';

@Injectable({
  providedIn: 'root'
})
export class PuntiMappaService {

  private _puntiSullaMappa$ = new Subject<PuntoSullamappa[]>();


  private _punti: PuntoSullamappa[] = [{ point: L.latLng(41.8901622, 12.4998408), date: new Date(Date.now()) }];

  constructor() {
    this._puntiSullaMappa$.next([...this._punti]);
  }

  getPuntiMappa$(): Observable<PuntoSullamappa[]> {
    return this._puntiSullaMappa$.asObservable();
  }

  addPuntoMappa(position: L.LatLng) {
    this._punti = [...this._punti, { point: position, date: new Date(Date.now()) }];
    this._puntiSullaMappa$.next([...this._punti]);

  }

  removePuntoMappa(puntoToRemove: PuntoSullamappa) {
    this._punti = this._punti.filter(punto => !punto.point.equals(puntoToRemove.point));

    this._puntiSullaMappa$.next([...this._punti]);
  }
}
