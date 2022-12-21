import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from './components/profil.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ProfilComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    ProfilComponent,
  ]
})
export class ProfilModule { }
