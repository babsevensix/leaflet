import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { GeocodeautocompleteDirective } from './geocodeautocomplete.directive';
import { LeafletMapDirective } from './leaflet-map.directive';
import { LeftBarComponent } from './left-bar/left-bar.component';
import { PostAuthServiceInteceptor } from './my-interceptor.service';
import { TopBarComponent } from './top-bar/top-bar.component';




@NgModule({
  declarations: [
    AppComponent,
    LeftBarComponent,
    TopBarComponent,
    FooterComponent,
    LeafletMapDirective,
    GeocodeautocompleteDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: PostAuthServiceInteceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
