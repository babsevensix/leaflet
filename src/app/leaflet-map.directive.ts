import { Directive, ElementRef, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Directive({
  selector: '[appLeafletMap]'
})
export class LeafletMapDirective implements OnInit {

  private mappa!: L.Map ;

  constructor(private elementRef: ElementRef) { }
  ngOnInit(): void {
    this.mappa = L.map(this.elementRef.nativeElement).setView([41.934441, 12.493692], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'edupala.com © Angular LeafLet',
    }).addTo(this.mappa);
  }

}
