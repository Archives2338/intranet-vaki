import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { SeguimientoComponent } from './pages/seguimiento/seguimiento.component';
import { TableClientsComponent } from './pages/seguimiento/components/table-clients/table-clients.component';
import { SharedModule } from '../../shared/shared.module';
import { ModalCreateClientComponent } from './pages/seguimiento/components/modal-create-client/modal-create-client.component';
import { ModalActionsClientComponent } from './pages/seguimiento/components/modal-actions-client/modal-actions-client.component';
import { SeguimientoClientComponent } from './pages/seguimiento-client/seguimiento-client.component';


@NgModule({
  declarations: [
    SeguimientoComponent,
    TableClientsComponent,
    ModalCreateClientComponent,
    ModalActionsClientComponent,
    SeguimientoClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
