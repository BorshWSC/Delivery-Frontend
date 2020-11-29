import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './component/common/app.component';
import {ApiService} from './service/ApiService';
import { RegistrationComponent } from './component/registration/registration.component';
import {routing} from './app-routing.module';
import { MainComponent } from './component/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
