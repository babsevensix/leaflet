import { Directive, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, switchMap } from 'rxjs';
import { GeocodeautompleteResModel } from './models/geocodeautomplete.req.model';
import { OpenRouteService } from './services/openroute.service';



@Directive({
  selector: '[appGeocodeautocomplete]'
})
export class GeocodeautocompleteDirective implements OnInit {

  private _textSearch = new Subject<string>();

  //private provider: OpenStreetMapProvider | undefined;

  @Output() geocodeResults: EventEmitter<GeocodeautompleteResModel> = new EventEmitter<GeocodeautompleteResModel>();

  @HostListener('input', ['$event']) onInput(event: any) {

    this._textSearch.next(event.target.value);


  }



  constructor(
    private openRouteService: OpenRouteService
    ) {
    //this.provider = new OpenStreetMapProvider();
  }
  ngOnInit(): void {
    // this._textSearch.asObservable()
    //   .pipe(
    //     debounceTime(1000),
    //   )
    //   .subscribe(async (searchText) => {
    //     if (this.provider) {
    //       const results: SearchResult<RawResult>[] = await this.provider.search({ query: searchText });
    //       this.geocodeResults.emit(results);
    //     }
    //   })

    this._textSearch.asObservable()
    .pipe(
      debounceTime(1000),
      switchMap(searchText => this.openRouteService.geocodeAutocomplete({
        text: searchText,
        sources: ['openstreetmap'],
        "boundary.country":'it'
      }))
    ).subscribe(result=>{

        this.geocodeResults.emit(result);
    });
  }

}


