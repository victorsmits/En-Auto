import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ToolsService} from "./service/tools.service";
import {User} from "./Interface/Interface.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit,OnInit {
  title = 'En-Auto';

  public user : User = {
    lastName : null,
    firstName : null,
    _id : null,
    email : null,
  };

  constructor(public tool: ToolsService) {}

  ngOnInit(): void {
    if(this.tool.isLoggedIn()){
      this.user = this.tool.getUser();
    }

    this.tool.AuthStatusListener.subscribe(status => {
      console.log(status);
      if(status){
        this.user = this.tool.getUser();
      }
    })
  }

  ngAfterViewInit(){

    console.log(this.tool.isLoggedIn());

    this.tool.AuthStatusListener.subscribe(status => {
      if(status){
        this.user = this.tool.getUser();
      }
    })
  }
}
