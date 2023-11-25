
import { LOCALE_ID, NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {register} from 'swiper/element/bundle';
import { OAuthModule } from 'angular-oauth2-oidc';
register()
@NgModule({

  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    OAuthModule.forRoot(),
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'en-GB' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
