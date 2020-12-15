import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './component/common/app.component';
import {ApiService} from './service/ApiService';
import {RegistrationComponent} from './component/registration/registration.component';
import {routing} from './app-routing.module';
import {MainComponent} from './component/main/main.component';
import {HeaderComponent} from './component/header/header.component';
import {UserService} from './service/UserService';
import {AuthService} from './service/AuthService';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import {DialogService} from './service/DialogService';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {CovalentDialogsModule} from "@covalent/core/dialogs";
import {MatButtonModule} from "@angular/material/button";
import {CookieService} from "ngx-cookie-service";
import { AuthorizationComponent } from './component/authorization/authorization.component';
import { FooterComponent } from './component/footer/footer.component';
import { FoodCardComponent } from './component/food-card/food-card.component';
import { MenuListComponent } from './component/menu-list/menu-list.component';
import {CommonModule} from "@angular/common";
import {MatOptionModule} from "@angular/material/core";
import { AccountComponent } from './component/account/account.component';
import { CartComponent } from './component/cart/cart.component';
import {CartService} from "./service/CartService";
import {MatCarouselModule} from "@ngmodule/material-carousel";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MainComponent,
    HeaderComponent,
    AuthorizationComponent,
    FooterComponent,
    FoodCardComponent,
    MenuListComponent,
    AccountComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    CovalentDialogsModule,
    MatButtonModule,
    BrowserModule,
    MatOptionModule,
    MatCarouselModule,
    NgbModule
  ],
  providers: [
    ApiService,
    UserService,
    AuthService,
    DialogService,
    MatDialogConfig,
    CookieService,
    CartService
  ],
  bootstrap: [AppComponent],

  entryComponents: []
})
export class AppModule { }
