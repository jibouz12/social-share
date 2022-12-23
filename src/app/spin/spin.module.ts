import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinComponent } from './components/spin.component';
import { SpinRoutingModule } from './spin-routing.module';



@NgModule({
  declarations: [
    SpinComponent
  ],
  imports: [
    CommonModule,
    SpinRoutingModule
  ],
  exports: [
    SpinComponent
  ]
})
export class SpinModule { }
