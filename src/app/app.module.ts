import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule, MatInputModule, MatButtonModule,
       MatMenuModule, MatTableModule, MatListModule, MatToolbarModule} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2TableModule } from 'ng2-table/ng2-table';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';

import { HomeComponent } from './home/home.component';
import { AuthService } from './_services/authentication.service';
import { GuardService } from './_services/guard.service';
import { UserService } from './_services/user.service';
import { ChatComponent } from './chat/chat.component';
import { SeetingsComponent } from './seetings/seetings.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ConfirmDirective } from './_directives/confim.directive';
import { PressedDirective } from './_directives/pressed.directive';
import { ChatDirective } from './_directives/chat.directive';
import { OverDirective } from './_directives/over.directive';
import { RegisterComponent } from './register/register.component';
//import { RbmqService } from './_services/rbmq.service';
import { NavbarService } from './_services/navbar.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ChatComponent,
    SeetingsComponent,
    NavbarComponent,
    ConfirmDirective,
    PressedDirective,
    ChatDirective,
    OverDirective,
    RegisterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatMenuModule,
    Ng2TableModule,
    MatToolbarModule
  ],
  providers: [AuthService, GuardService, UserService, NavbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
