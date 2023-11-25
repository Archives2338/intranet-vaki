import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';

import { SharedModule  as SharedGeneral } from '../shared/shared.module';
import { SharedModule } from '../admin/shared/shared.module';
import { TableInfoServiceComponent } from './components/table-info-service/table-info-service.component';

@NgModule({

  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule,
    SharedGeneral
  ],
  declarations: [
    LandingComponent,
    TableInfoServiceComponent
  ],
  exports: [
    SharedModule,
    SharedGeneral
  ]
})
export class LandingModule { }
