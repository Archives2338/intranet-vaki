import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ECommerceComponent } from './e-commerce.component';

const routes: Routes = [
{
  path: '',
  component: ECommerceComponent,
  children: [


    {
      path:'subscription',
      loadChildren: () => import('./pages/subscription/subscription.module').then(m => m.SubscriptionModule),
    }

  ]
},
{
  path:'auth',
  loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ECommerceRoutingModule { }
