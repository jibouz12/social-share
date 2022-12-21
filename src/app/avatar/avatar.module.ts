import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './components/avatar.component';
import { AvatarRoutingModule } from './avatar-routing.module';



@NgModule({
  declarations: [
    AvatarComponent,
  ],
  imports: [
    CommonModule,
    AvatarRoutingModule,
  ],
  exports: [
    AvatarComponent,
  ]
})
export class AvatarModule { }
