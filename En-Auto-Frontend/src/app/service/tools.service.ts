import {Injectable} from '@angular/core';
import {ApiService} from "./api.service";
import {Devis, User, WaterCost} from "../Interface/Interface.module";
import {Observable, Subject} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";
import {MathService} from "./math.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ToolsService {
  public authStatusListener : Subject<boolean> = new Subject<boolean>();

  constructor(public api : ApiService,
              public math : MathService,
              private _snackBar: MatSnackBar,
              private router:Router) { }

  get AuthStatusListener() : Observable<any> {
    return this.authStatusListener.asObservable();
  }

  isValid(controlName,form): boolean {
    return form.get(controlName).invalid && form.get(controlName).touched;
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
    this.router.navigate([""]).then(r => {
      location.reload();
      this.authStatusListener.next(false)
    })


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
    console.log(data)
    return {
      _id: data["_id"] ? data["_id"] : undefined,
      address: data["address"] ? data["address"] : undefined,
      code_postal: data["code_postal"] ? data["code_postal"] : undefined,
      id_user: data["id_user"] ? data["id_user"] : undefined,
      structural_cost: data["structural_cost"] ? data["structural_cost"] : undefined,
      routing_cost: data["routing_cost"] ? data["routing_cost"] : undefined,
      tank_cost: data["tank_cost"] ? data["tank_cost"] : undefined,
      consum: data["consum"] ? data["consum"] : undefined,
      water_cost: data["water_cost"] ? data["water_cost"] : undefined,
      water_volume: data["water_volume"] ? data["water_volume"] : undefined,
      roof_area: data["roof_area"] ? data["roof_area"] : undefined,
      vol_storage: data["vol_storage"] ? data["vol_storage"] : undefined,
      final_save : data["final_save"]? data["final_save"] : undefined,
      rentability: data["rentability"] ? data["rentability"] : undefined,
      total_cost: data["total_cost"] ? data["total_cost"] : undefined,
      created_at: data["created_at"] ? data["created_at"] : new Date(),

      tiles_cost: data["tiles_cost"] ? data["tiles_cost"] : undefined,
      tiles_number: data["tiles_number"] ? data["tiles_number"] : undefined,

      gutter_length: data["gutter_length"] ? data["gutter_length"] : undefined,
      gutter_cost: data["gutter_cost"] ? data["gutter_cost"] : undefined
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

  openSnackBar(message: string, action: string,time = 2000) {
    this._snackBar.open(message, action, {
      duration: time,
    });
  }

  convertDateToString(date : Date){
    let d = new Date(date);
    return d.toLocaleDateString();
  }

}
