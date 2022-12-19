import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilComponent } from './components/profil.component';



@NgModule({
  declarations: [
    ProfilComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProfilComponent,
  ]
})
export class ProfilModule { }
