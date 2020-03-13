import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../service/api.service";
import {ToolsService} from "../service/tools.service";
import {Router} from "@angular/router";

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
              public tool: ToolsService,
              public router : Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.api.login(this.loginForm.value).subscribe(data => {
        localStorage.setItem("token", data["token"].toString());

        this.tool.setProfile();
        this.router.navigate([''])

      }, error => {
        this.errorMessage = error
      })
    }
  }
}
