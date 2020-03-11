import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../service/api.service";
import {ToolsService} from "../service/tools.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(public API: ApiService,
              public fb: FormBuilder,
              public tool : ToolsService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["",[Validators.email,Validators.required]],
      lastName: ["",[Validators.required]],
      firstName:["",[Validators.required]],
      password: ["",[Validators.required]]
    });
  }

  isValid(controlName): boolean {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched;
  }

  register(loginForm: FormGroup) {
    console.log(loginForm.value);
    this.API.register(loginForm.value).subscribe(data => {
      console.log(data)
    })
  }
}
