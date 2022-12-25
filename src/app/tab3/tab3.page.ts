import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  insta!: string;

  constructor(private authService : AuthService,
              private router : Router,
              private alertController : AlertController) {}

  ionViewDidEnter() {
    this.insta = this.authService.getUserInsta();
  }

  changeAvatar() {
    this.router.navigateByUrl('avatar');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Logout ?',
      buttons: [
        {
          text: 'No',
          cssClass: 'alert-button-cancel',
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.authService.logout()
          },
        },
      ],
    });

    await alert.present();
  }

}
