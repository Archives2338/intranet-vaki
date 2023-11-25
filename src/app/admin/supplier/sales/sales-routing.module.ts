import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisVentasComponent } from './pages/mis-ventas/mis-ventas.component';


const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'platforms'
  },
  {
    path: 'mis-ventas',
    loadChildren: () => import('./pages/mis-ventas/mis-ventas.module').then(m => m.MisVentasModule)
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
