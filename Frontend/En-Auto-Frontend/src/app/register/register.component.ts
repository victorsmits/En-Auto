import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(public API : ApiService) {
    this.form = new FormGroup({
      email : new FormControl('null', Validators.email),
      lastName : new FormControl('null', Validators.required),
      firstName : new FormControl('null', Validators.required),
      password : new FormControl('null', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  isValid(controlName): boolean {
    return this.form.get(controlName).invalid && this.form.get(controlName).touched;
  }

  register() {
    console.log(this.form.value);
    this.API.register(this.form.value).subscribe(data =>{
      console.log(data)
    })
  }
}
