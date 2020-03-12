import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { EstimationComponent } from './estimation/estimation.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatStepperModule} from "@angular/material/stepper";
import {MatTreeModule} from "@angular/material/tree";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EstimationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatProgressBarModule,
    MatStepperModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export class MaterialModule { }
