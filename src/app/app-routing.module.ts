import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import(`./admin/admin.module`).then((m) => m.AdminModule),
  },
  {
    path:'auth',
    canActivate: [LoginGuard],
    loadChildren: () =>
    import(`./auth/auth.module`).then((m) => m.AuthModule),
  },
  {
    path:'landing',
    loadChildren: () =>
    import(`./landing/landing.module`).then((m) => m.LandingModule),
  },

  {
    path:'e-commerce',
    loadChildren: () =>
    import(`./e-commerce/e-commerce.module`).then((m) => m.ECommerceModule),
  },
  {
    path:'',
    redirectTo: 'admin',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo: 'admin',
    pathMatch:'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
