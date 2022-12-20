import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { GPSService } from 'src/app/core/services/GPS.service';
import { interval, Observable, tap } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { GPS } from 'src/app/core/models/GPS.model';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  post$!: Observable<GPS[]>;
  latitude!: number;
  longitude!: number;

  constructor(private geolocation: Geolocation,
              private GPSService : GPSService) {}

  ngOnInit() {
    this.getLocation()

    interval(300000).subscribe(() => {
      this.getLocation();
    })
  }


//////////////////////////////////////
//////////////////////////////////////
  handleRefresh(event : any) {
    setTimeout(() => {
      this.getLocation()
      event.target.complete();
    }, 1500);
  };

/////////////////////////////////////
////////////////////////////////////
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      console.log(this.latitude)
      this.longitude = resp.coords.longitude;
      console.log(this.longitude)
     }).catch((error) => {
       console.log('Error getting location', error);
     });

     this.GPSService.modifyGPS(this.latitude, this.longitude).pipe(
      take(1),
      tap(() => {
        this.post$ = this.GPSService.closeGPS(this.latitude, this.longitude);
      })
     ).subscribe();
  }

}
