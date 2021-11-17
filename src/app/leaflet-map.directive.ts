import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { MappaService } from './services/mappa.service';

@Directive({
  selector: '[appLeafletMap]'
})
export class LeafletMapDirective implements AfterViewInit {




  constructor(private elementRef: ElementRef, private mappaService: MappaService) { }
  ngAfterViewInit(): void {
    this.mappaService.initMappa(this.elementRef);

  }

  ngOnInit(): void {

  }


}
