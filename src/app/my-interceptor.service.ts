import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class PostAuthServiceInteceptor implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.method === 'POST') {
      const updateRequest = req.clone({
        headers: req.headers.set('Authorization', environment.openrouteservicekey)
      });
      return next.handle(updateRequest).pipe(
        // tap(event => {
        //   console.log(' my intercept' , event);
        // })
      );
    }
    return next.handle(req);


  }
}
