import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor() {
    this.form = new FormGroup({
      email : new FormControl('null', Validators.email),
      password : new FormControl('null', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  isValid(controlName): boolean {
    return this.form.get(controlName).invalid && this.form.get(controlName).touched;
  }
}
