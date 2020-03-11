import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../service/api.service";
import {ToolsService} from "../service/tools.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public errorMessage: string;
  public profile: JSON;
  ok: boolean;

  constructor(private api: ApiService,
              private fb: FormBuilder,
              public tool: ToolsService) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  onLogin() {
    console.log(this.loginForm);
    if (this.loginForm.valid) {
      this.api.login(this.loginForm.value).subscribe(data => {
        console.log(data["token"]);
        localStorage.setItem("token", data["token"].toString());

        this.tool.setProfile();
        console.log(this.tool.getUser()._id);
        this.ok = true;

      }, error => {
        this.errorMessage = error
      })
    }
  }
}
