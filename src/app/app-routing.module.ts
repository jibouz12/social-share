import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: "auth", loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule) }, 
  { path: "spin", loadChildren: () => import("./spin/spin.module").then(m => m.SpinModule) }, 
];  
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
