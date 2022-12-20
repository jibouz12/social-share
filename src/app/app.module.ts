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
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    AuthModule,
    SharedModule,
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
