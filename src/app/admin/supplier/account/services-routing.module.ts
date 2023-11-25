import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatformsComponent } from './pages/platforms/platforms.component';

const routes: Routes = [


  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'platforms'
  },
  {
    path: 'platforms',
    component: PlatformsComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
