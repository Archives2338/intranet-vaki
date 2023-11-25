import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NextPaymentsComponent } from './next-payments.component';

const routes: Routes = [{
  path:'',
  component: NextPaymentsComponent,
  pathMatch:'full'
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NextPaymentsRoutingModule { }
