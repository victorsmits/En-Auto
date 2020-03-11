import {Injectable} from '@angular/core';
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
    this.api.getProfile().subscribe(data => {
      let profile = JSON.parse(JSON.stringify(data))["profile"];

      let UserProfile : User = {
        _id: profile["_id"],
        lastName: profile["lastName"],
        firstName: profile["firstName"],
        email: profile["email"],
      };

      localStorage.setItem("user",JSON.stringify(UserProfile));
    })
  }

  getUser(): User{
    let user = localStorage.getItem("user");

    let profile = JSON.parse(user);
    return {
      _id: profile._id,
      lastName: profile.lastName,
      firstName: profile.firstName,
      email: profile.email,
    }

  }
}
