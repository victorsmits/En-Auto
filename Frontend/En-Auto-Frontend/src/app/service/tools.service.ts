import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Devis, User, WaterCost} from "../Interface/Interface.module";
import {Observable, Subject} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";
import {MathService} from "./math.service";

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  public authStatusListener : Subject<boolean> = new Subject<boolean>();

  constructor(public api : ApiService,
              public math : MathService) { }

  isValid(controlName,form): boolean {
    return form.get(controlName).invalid && form.get(controlName).touched;
  }

  get AuthStatusListener() : Observable<any> {
    return this.authStatusListener.asObservable();
  }

  isLoggedIn(): boolean {
    return "user" in localStorage
  }

  onLogin(){
    this.authStatusListener.next(true);
  }

  onLogout(){
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    location.reload();
    this.authStatusListener.next(false)
  }

  setProfile(){
    this.api.getProfile().subscribe(data => {
      let profile = JSON.parse(JSON.stringify(data))["profile"];
      console.log(profile);
      let UserProfile : User = {
        _id: profile["_id"],
        lastName: profile["lastName"],
        firstName: profile["firstName"],
        email: profile["email"],
      };

      localStorage.setItem("user",JSON.stringify(UserProfile));
      this.onLogin();
    })
  }

  setDevis(data : JSON) : Devis {
    return {
      _id: data["_id"] ? data["_id"] : undefined,
      id_user: data["id_user"] ? data["id_user"] : undefined,
      structural_cost: data["structural"] ? data["structural"] : undefined,
      routing_cost: data["routing_cost"] ? data["routing_cost"] : undefined,
      tank_cost: data["tank_cost"] ? data["tank_cost"] : undefined,
      consum: data["consum"] ? data["consum"] : undefined,
      water_cost: data["water_cost"] ? data["water_cost"] : undefined,
      water_volume: data["water_volume"] ? data["water_volume"] : undefined,
      roof_area: data["roof_area"] ? data["roof_area"] : undefined,
      final_save : data["final_save"]? data["final_save"] : undefined,
      rentability: data["rentability"] ? data["rentability"] : undefined,
      created_at: data["created_at"] ? data["created_at"] : new Date(),
    }
  }

  setWaterCost(data: JSON) : WaterCost {
      let waterCost : WaterCost = {
        _id: data["_id"],
        postCode: data["postCode"],
        cost: data["cost"]
      };
      console.log(waterCost);
      return waterCost;
  }

  getUser(): User{

    if("user" in localStorage){
      let user = localStorage.getItem("user");
      let profile = JSON.parse(user);
      return {
        _id: profile["_id"],
        lastName: profile["lastName"],
        firstName: profile["firstName"],
        email: profile["email"],
      }
    }
  }

}
