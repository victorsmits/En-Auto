import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.css']
})
export class EstimationComponent implements OnInit {

  public estiForm : FormGroup;
  hasTiles: string;
  formStep = ["step1"];
  ctx: any;
  constructor(public api: ApiService,
              public fb : FormBuilder) { }

  ngOnInit(): void {
    this.estiForm = this.fb.group({
      step: this.fb.array([]),
      address: ["", [Validators.required]],
      postalCode: ["", [Validators.required]],
      houseArea: ["", [Validators.required]],
      tiles_nb: [""]
    });
  }


  setTiles(value: any) {
    return this.hasTiles = value;
  }

  next() {

  }
}
