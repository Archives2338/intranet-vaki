import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NextPaymentsRoutingModule } from './next-payments-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { NextPaymentsComponent } from './next-payments.component';


@NgModule({
  declarations: [
    NextPaymentsComponent
  ],
  imports: [
    CommonModule,
    NextPaymentsRoutingModule,
    SharedModule
  ]
})
export class NextPaymentsModule { }
