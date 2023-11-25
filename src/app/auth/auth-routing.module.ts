import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path:'',
    component: AuthComponent,
    children:[
      {
        path:'',
        component:LoginComponent
      },
      {
        path:'forgot-password',
        component:ForgotPasswordComponent
      },
      {
        path:'recover-password',
        component:RecoverPasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
