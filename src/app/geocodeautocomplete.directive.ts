import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { RawResult } from 'leaflet-geosearch/dist/providers/openStreetMapProvider';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';


@Directive({
  selector: '[appGeocodeautocomplete]'
})
export class GeocodeautocompleteDirective {

  private provider : OpenStreetMapProvider|undefined;

  @Output() geocodeResults: EventEmitter<SearchResult<RawResult>[]> = new EventEmitter<SearchResult<RawResult>[]>();

  @HostListener('input', ['$event']) async onInput(event: any) {

    if (this.provider) {
      const results:SearchResult<RawResult>[] = await this.provider.search({ query: event.target.value });
      this.geocodeResults.emit(results);
    }
  }



  constructor() {
    this.provider = new OpenStreetMapProvider();



  }

}

