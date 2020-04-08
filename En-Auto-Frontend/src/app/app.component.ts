import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ToolsService} from "./service/tools.service";
import {Mail, User} from "./Interface/Interface.module";
import {RouterOutlet} from "@angular/router";
import {slideInAnimation} from "./animation";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "./service/api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class AppComponent implements AfterViewInit,OnInit {
  title = 'En-Auto';

  public user : User = {
    lastName : null,
    firstName : null,
    _id : null,
    email : null,
  };

  Mailer: FormGroup;
  sended: String;

  constructor(public tool: ToolsService,
              public fb : FormBuilder,
              public api:ApiService) {}

  ngOnInit(): void {
    if(this.tool.isLoggedIn()){
      this.user = this.tool.getUser();
    }

    this.Mailer = this.fb.group({
      mail : [null,[Validators.required,Validators.email]],
      name : [null,[Validators.required]],
      obj : [null,[Validators.required]],
      content : [null,[Validators.required]],
    })

    this.tool.AuthStatusListener.subscribe(status => {
      if(status){
        this.user = this.tool.getUser();
      }
    })
  }

  ngAfterViewInit(){

    this.tool.AuthStatusListener.subscribe(status => {
      if(status){
        this.user = this.tool.getUser();
      }
    })
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  sendMail() {
    let mail :Mail = {
      name : this.Mailer.value["name"],
      obj : this.Mailer.value["obj"],
      content : this.Mailer.value["content"],
      mail : this.Mailer.value["mail"],
    }
    this.api.sendMail(mail).subscribe((data:String)=>{
      this.sended = data
    })
  }
}
