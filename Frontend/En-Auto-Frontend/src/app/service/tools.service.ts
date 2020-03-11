import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {User} from "../Interface/Interface.module";

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(public api : ApiService) { }

  isValid(controlName,form): boolean {
    return form.get(controlName).invalid && form.get(controlName).touched;
  }

  setProfile(){
    let UserProfile : User;
    this.api.getProfile().subscribe(data => {
      let profile = JSON.parse(JSON.stringify(data))["Profile"];
      UserProfile._id = profile._id;
      UserProfile.lastName = profile.lastName;
      UserProfile.firstName = profile.firstName;
      UserProfile.email = profile.email;
    })
  }
}
