import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {User} from "../Interface/Interface.module";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(public api : ApiService,
              private breakpointObserver: BreakpointObserver) { }

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

  get isHandset$(): Observable<boolean> {
    return this._isHandset$;
  }
  private _isHandset$: Observable<boolean> = this.breakpointObserver.observe([
    Breakpoints.HandsetLandscape,
    Breakpoints.HandsetPortrait,
    Breakpoints.TabletLandscape,
    Breakpoints.TabletPortrait])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
