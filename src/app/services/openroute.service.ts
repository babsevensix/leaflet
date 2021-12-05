

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GeocodeautompleteReqModel, GeocodeautompleteResModel } from '../models/geocodeautomplete.req.model';


const OPEN_ROUTE_URL: string = `https://api.openrouteservice.org`;


@Injectable({providedIn: 'root'})
export class OpenRouteService {


  constructor(private httpClient: HttpClient) { }

  geocodeAutocomplete(req: GeocodeautompleteReqModel): Observable<GeocodeautompleteResModel>{

    let queryParams = {...req, };

    return this.httpClient.get<GeocodeautompleteResModel>(`${OPEN_ROUTE_URL}/geocode/autocomplete?api_key=${environment.openrouteservicekey}`,{params: queryParams});
  }

  getDirections(coordinates : number[][]): Observable<string>{

    const data = { coordinates, language:'it' };
    // let headers = new HttpHeaders({
    //   'Authorization': environment.openrouteservicekey,
    // });
    return this.httpClient.post<any>(`${OPEN_ROUTE_URL}/v2/directions/driving-car/geojson`,data,
    // { headers}
    ).pipe(
      map(res=> {
        return JSON.stringify(res);
      })
    );
  }
}