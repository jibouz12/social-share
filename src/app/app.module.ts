import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Tab1PageModule } from './tab1/tab1.module';
import { Tab3PageModule } from './tab3/tab3.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    AuthModule,
    Tab1PageModule,
    Tab3PageModule,
  ],

  providers: [
    {
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy,
    },
    Geolocation,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
