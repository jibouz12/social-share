import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
                private constants: Constants) {}

    
//////////////
/// créer localisation
createGPS(latitude : number, longitude : number, pseudo : string, insta : string) {
  return this.http.post<{ message: string }>(`${this.constants.protocol}://${this.constants.domain}/api/gps`, {latitude: latitude, longitude: longitude, pseudo: pseudo, insta: insta});
}

/////////////////
/// modifier la localisation
modifyGPS(latitude : number, longitude : number) {
  return this.http.put<{ message: string }>(`${this.constants.protocol}://${this.constants.domain}/api/gps`, {latitude: latitude, longitude:longitude});
}

/////////////////
///  localisation proche
closeGPS(latitude: number, longitude: number) : Observable<GPS[]> {
  return this.http.get<GPS[]>(`${this.constants.protocol}://${this.constants.domain}/api/gps/${latitude}+${longitude}`);
}




}