import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ECommerceRoutingModule } from './e-commerce-routing.module';
import { ECommerceComponent } from './e-commerce.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CouponComponent } from './shared/coupon/coupon.component';
import { MatIconModule } from '@angular/material/icon';
import { ReseniaComponent } from './components/resenia/resenia.component';
import { ModalServiceComponent } from './components/modal-service/modal-service.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
@NgModule({
  declarations: [
    ECommerceComponent,
    HeaderComponent,
    FooterComponent,
    CouponComponent,
    ReseniaComponent,
    ModalServiceComponent,

  ],
  imports: [
    CommonModule,
    ECommerceRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule
  ],
  exports: [

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ECommerceModule { }
