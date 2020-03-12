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
  hasGutter: string;
  knowConsommation: string;
  choice: string;
  formStep = 0;
  goFurther: boolean = false;
  constructor(public api: ApiService,
              public fb : FormBuilder) { }

  ngOnInit(): void {
    this.estiForm = this.fb.group({
      address: ["", [Validators.required]],
      postalCode: ["", [Validators.required]],
      houseArea: ["", [Validators.required]],
      tiles_nb: [null],
      m_gutter: [null],
      consommation: [null],
      people:[null],
      nb_machin: [null],
      garden_area: [null],
    });
  }

  // Loading bar

  get Status() : number{
    if(this.formStep <= 2){
      return this.formStep * 50
    }else{
      return this.formStep * 20
    }
  }

  // Form Question control

  setTiles(value: any) {
    return this.hasTiles = value;
  }

  setGutter(value: any) {
    return this.hasGutter = value;
  }

  setConsommation(value: any) {
    return this.knowConsommation = value;
  }

  setUse(value: any) {
    return this.choice = value;
  }

  // Form Navigation

  next() {
    this.formStep += 1;
  }

  submitForm() {
    if(this.estiForm.valid){

    }
  }

  prev() {
    this.formStep -= 1;
  }



  
}
