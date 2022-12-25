import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { IonModal, RangeCustomEvent } from '@ionic/angular';
import { RangeValue } from '@ionic/core';
import { take, tap } from 'rxjs';
import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  avatar!: string;
  avatarSelected!: string;
  moveEnd!: RangeValue;
  @ViewChild(IonModal) modal!: IonModal;

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

  
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.avatar, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
        this.avatar = this.avatarSelected;
        this.authService.updateAvatar(this.avatar).pipe(
          take(1),
          tap(() => {
            localStorage.setItem('avatar', this.avatar)
          }),
        ).subscribe()
    }
  }

  onClick(objectClicked : string) {
    this.avatarSelected = objectClicked;
  }

}
