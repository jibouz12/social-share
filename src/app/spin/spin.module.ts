import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinComponent } from './components/spin.component';
import { SpinRoutingModule } from './spin-routing.module';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    SpinComponent
  ],
  imports: [
    CommonModule,
    SpinRoutingModule,
    IonicModule
  ],
  exports: [
    SpinComponent
  ]
})
export class SpinModule { }
