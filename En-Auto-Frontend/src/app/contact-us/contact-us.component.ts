import { Component, OnInit } from '@angular/core';
import {Mail} from "../Interface/Interface.module";
import {ApiService} from "../service/api.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToolsService} from "../service/tools.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  Mailer: FormGroup;
  sended: string = "";
  isLoading: boolean;

  constructor(public api:ApiService,
              public fb : FormBuilder,
              public tool: ToolsService) { }

  ngOnInit(): void {

    this.Mailer = this.fb.group({
      mail : [null,[Validators.required,Validators.email]],
      name : [null,[Validators.required]],
      obj : [null,[Validators.required]],
      content : [null,[Validators.required]],
    })
  }
  sendMail() {
    this.isLoading = true;
    let mail :Mail = {
      name : this.Mailer.value["name"],
      obj : this.Mailer.value["obj"],
      content : this.Mailer.value["content"],
      mail : this.Mailer.value["mail"],
    }
    this.api.sendMail(mail).subscribe(data=>{
      let isSend = JSON.parse(JSON.stringify(data));
      if(isSend["message"] === "send"){

        this.tool.openSnackBar("message envoyer",'',5000)
      }else{
        this.tool.openSnackBar("Echec de l'envoie du message",'',5000)
      }
      this.sended = isSend["message"];
      this.isLoading = false;
    })
  }
}
