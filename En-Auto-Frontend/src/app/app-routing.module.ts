import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {EstimationComponent} from "./estimation/estimation.component";
import {ProfileComponent} from "./profile/profile.component";
import {AboutUsComponent} from './about-us/about-us.component';
import {ContactUsComponent} from "./contact-us/contact-us.component";


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data : {animation: 'isRight'}
  },
  {
    path: 'register',
    component: RegisterComponent,
    data : {animation: 'isRight'}
  },
  {
    path: '',
    component: EstimationComponent,
    data : {animation: 'HomePage'}
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data : {animation: 'isRight'}
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
    data : {animation: 'AboutPage'}
  },
  {
    path: 'contact',
    component: ContactUsComponent,
    data : {animation: 'ContactPage'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
