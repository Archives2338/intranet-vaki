import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisVentasComponent } from './mis-ventas.component';
import { CrearVentaComponent } from './sub-pages/crear-venta/crear-venta.component';
import { TableMisVentasComponent } from './sub-pages/info-ventas/components/table-mis-ventass/table-mis-ventass.component';
import { InfoVentasComponent } from './sub-pages/info-ventas/info-ventas.component';
import { EditarVentaComponent } from './sub-pages/editar-venta/editar-venta.component';

const routes: Routes = [
  {
    path: '',
    component: MisVentasComponent,
    children: [
      {
        path: 'crear-venta',
        pathMatch: 'full',
        component: CrearVentaComponent
      },
      {
        path: 'info-ventas',
        pathMatch: 'full',
        component: InfoVentasComponent
      },
      {
        path:'editar-venta/:id',
        pathMatch:'full',
        component:EditarVentaComponent
      },


      ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisVentasRoutingModule { }
