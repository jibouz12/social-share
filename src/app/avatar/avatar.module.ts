import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './components/avatar.component';
import { AvatarRoutingModule } from './avatar-routing.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    AvatarComponent,
  ],
  imports: [
    CommonModule,
    AvatarRoutingModule,
    IonicModule,
  ],
  exports: [
    AvatarComponent,
  ]
})
export class AvatarModule { }
