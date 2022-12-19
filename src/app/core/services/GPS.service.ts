import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Constants } from 'src/app/constants/constants';
import { Observable } from 'rxjs/internal/Observable';
import { GPS } from '../models/GPS.model';


@Injectable({
    providedIn: 'root'
  })
  export class GPSService {
    private latitude = "";
    private longitude = "";


    constructor(private http: HttpClient,
                private router: Router,
                private constants: Constants) {}


///////////////////
/// récupérer une localisation avec user id
getGPSByUserId(UserId : string) : Observable<GPS> {
    return this.http.get<GPS>(`${this.constants.protocol}://${this.constants.domain}/api/gps/${UserId}`);
}
    
//////////////
/// créer localisation
createGPS(latitude : number, longitude : number) {
  return this.http.post<{ message: string }>(`${this.constants.protocol}://${this.constants.domain}/api/gps`, {latitude: latitude, longitude:longitude});
}

/////////////////
/// modifier la localisation
modifyGPS(latitude : number, longitude : number) {
  return this.http.put<{ message: string }>(`${this.constants.protocol}://${this.constants.domain}/api/gps`, {latitude: latitude, longitude:longitude});
}






}