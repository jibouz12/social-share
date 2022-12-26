import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { Tab1Page } from '../tab1/tab1.page';
import { Tab3Page } from '../tab3/tab3.page';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '', component: Tab1Page, canActivate: [AuthGuard]
      },
      {
        path: 'profil', component: Tab3Page, canActivate: [AuthGuard]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
