import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
  styleUrls: ['./gps.component.scss'],
})
export class GpsComponent implements OnInit {
  latitude!: number;
  longitude!: number;

  constructor(private geolocation: Geolocation) { }

  ngOnInit() {
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
       if ("coords" in data) {
        this.latitude = data.coords.latitude;
        console.log(data.coords.latitude) 
        this.longitude = data.coords.longitude;
        console.log(data.coords.longitude) 
       }
      });
    }
  }
