import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisVentasRoutingModule } from './mis-ventas-routing.module';
import { CrearVentaComponent } from './sub-pages/crear-venta/crear-venta.component';
import { InfoVentasComponent } from './sub-pages/info-ventas/info-ventas.component';
import { SharedModule } from "../../../../shared/shared.module";
import { TableMisVentasComponent } from './sub-pages/info-ventas/components/table-mis-ventass/table-mis-ventass.component';
import { EditarVentaComponent } from './sub-pages/editar-venta/editar-venta.component';
import { ModalRenovarComponent } from './sub-pages/info-ventas/components/modal-renovar/modal-renovar.component';


@NgModule({
    declarations: [
        CrearVentaComponent,
        InfoVentasComponent,
        TableMisVentasComponent,
        EditarVentaComponent,
        ModalRenovarComponent,

    ],
    imports: [
        CommonModule,
        MisVentasRoutingModule,
        SharedModule
    ]
})
export class MisVentasModule { }
