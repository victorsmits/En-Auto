import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {EstimationComponent} from "./estimation/estimation.component";


const routes: Routes = [
  {
    path:'login',
    component : LoginComponent,
  },
  {
    path:'register',
    component : RegisterComponent,
  },
  {
    path:'',
    component : EstimationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
