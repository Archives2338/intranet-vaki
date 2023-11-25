import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path:'',
        loadChildren: () => import('./supplier/dashboard/dashboard.module').then(m => m.DashboardModule),
      },

      {
        path: 'client',
        loadChildren: () => import('./supplier/client/client.module').then(m => m.ClientModule),
      },
      {
        path: 'sales',
        loadChildren: () => import('./supplier/sales/sales.module').then(m => m.SalesModule),

      },
      {
        path: 'services',
        loadChildren: () => import('./supplier/account/services.module').then(m => m.ServicesModule),

      },
      {
        path: 'next-payments',
        loadChildren: () => import('./supplier/next-payments/next-payments.module').then(m => m.NextPaymentsModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./supplier/profile/profile.module').then(m => m.ProfileModule),
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
