import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GpsComponent } from './components/gps.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    GpsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    GpsComponent
  ]
})
export class GpsModule { }
