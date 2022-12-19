import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { GPSService } from 'src/app/core/services/GPS.service';
import { interval } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';


@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss'],
})
export class GpsComponent implements OnInit {
  latitude!: number;
  longitude!: number;

  constructor(private geolocation: Geolocation,
              private GPSService : GPSService) { }

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
      take(1)
     ).subscribe();
  }

  
}
