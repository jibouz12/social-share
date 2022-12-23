import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { RangeCustomEvent } from '@ionic/angular';
import { RangeValue } from '@ionic/core';
import { take, tap } from 'rxjs';



@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  avatar!: string;
  moveEnd!: RangeValue;

  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.avatar = this.authService.getUserAvatar();

    this.authService.getDist().pipe(
      take(1),
      tap(e => this.moveEnd = e.dist)
    ).subscribe();

  }

  onIonKnobMoveEnd(ev: Event) {
    this.moveEnd = (ev as RangeCustomEvent).detail.value;
    this.authService.updateDist(this.moveEnd as number).pipe(
      take(1)
    ).subscribe()
  }
}
