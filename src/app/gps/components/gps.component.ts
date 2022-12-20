import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { GPSService } from 'src/app/core/services/GPS.service';
import { interval, Observable, tap } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { GPS } from 'src/app/core/models/GPS.model';


@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss'],
})
export class GpsComponent implements OnInit {
  latitude!: number;
  longitude!: number;
  pseudo!: string;
  insta!: string;

  post$!: Observable<GPS[]>;

  constructor(private geolocation: Geolocation,
              private GPSService : GPSService ) { }

  ngOnInit() {
///////////
// récupérer la localisation et l'actualiser toutes les 5min
    this.getLocation();

    interval(300000).subscribe(() => {
      this.getLocation();
    })



    
 
  }

///////////////////////////
/// fonction pour récupérer la localisation et l'actualiser dans la BDD
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


////////////////////////////
  

  
}
