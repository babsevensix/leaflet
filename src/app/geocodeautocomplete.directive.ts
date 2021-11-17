import { Directive, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { RawResult } from 'leaflet-geosearch/dist/providers/openStreetMapProvider';
import { SearchResult } from 'leaflet-geosearch/dist/providers/provider';
import { debounceTime, Subject } from 'rxjs';



@Directive({
  selector: '[appGeocodeautocomplete]'
})
export class GeocodeautocompleteDirective implements OnInit {

  private _textSearch = new Subject<string>();

  private provider : OpenStreetMapProvider|undefined;

  @Output() geocodeResults: EventEmitter<SearchResult<RawResult>[]> = new EventEmitter<SearchResult<RawResult>[]>();

  @HostListener('input', ['$event']) async onInput(event: any) {

    this._textSearch.next(event.target.value);


  }



  constructor() {
    this.provider = new OpenStreetMapProvider();



  }
  ngOnInit(): void {
    this._textSearch.asObservable()
    .pipe(
      debounceTime(1000),
    )
    .subscribe( async (searchText)=>{
      if (this.provider) {
        const results:SearchResult<RawResult>[] = await this.provider.search({ query: searchText });
        this.geocodeResults.emit(results);
      }
    })
  }

}


