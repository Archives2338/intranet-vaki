import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeguimientoComponent } from './pages/seguimiento/seguimiento.component';
import { SeguimientoClientComponent } from './pages/seguimiento-client/seguimiento-client.component';

const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'platforms'
  },
  {
    path: 'seguimiento',
    component: SeguimientoComponent
  },
  {
    path: 'seguimiento/:id',
    component: SeguimientoClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
