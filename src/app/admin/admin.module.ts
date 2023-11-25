import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule  as SharedGeneral} from '../shared/shared.module';
import { SharedModule } from './shared/shared.module';



@NgModule({

  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    SharedGeneral
  ],

  declarations: [
     AdminComponent


  ],
  exports: [
    SharedModule,
    SharedGeneral
  ]
})
export class AdminModule { }
