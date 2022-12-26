import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';

import { ProfilModule } from '../profil/profil.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProfilModule,
    IonicModule,
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
