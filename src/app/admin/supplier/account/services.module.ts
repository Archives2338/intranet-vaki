import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { PlatformsComponent } from './pages/platforms/platforms.component';
import { TablePlatformsComponent } from './pages/platforms/components/table-platforms/table-platforms.component';
import { SharedModule } from '../../shared/shared.module';
import { ModalInfoClientplatformComponent } from './pages/platforms/components/modal-info-clientplatform/modal-info-clientplatform.component';
import { ModalCreatePlatformComponent } from './pages/platforms/components/modal-create-platform/modal-create-platform.component';
import { ModalEditPlatformComponent } from './pages/platforms/components/modal-edit-platform/modal-edit-platform.component';

@NgModule({
  declarations: [
    PlatformsComponent,
    TablePlatformsComponent,
    ModalInfoClientplatformComponent,
    ModalCreatePlatformComponent,
    ModalEditPlatformComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ServicesModule { }
