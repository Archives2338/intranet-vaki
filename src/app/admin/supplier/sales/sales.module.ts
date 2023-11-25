import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { MisVentasComponent } from './pages/mis-ventas/mis-ventas.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MisVentasComponent

  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    SharedModule
  ]
})
export class SalesModule { }
