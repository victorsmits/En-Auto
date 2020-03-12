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
  formStep = 1;
  ctx: any;
  constructor(public api: ApiService,
              public fb : FormBuilder) { }

  ngOnInit(): void {
    this.estiForm = this.fb.group({
      step: this.fb.array([]),
      address: ["", [Validators.required]],
      postalCode: ["", [Validators.required]],
      houseArea: ["", [Validators.required]],
      tiles_nb: [""],
      m_gutter: [""],
      consommation: [""],
      people:[""],
      nb_machin: [""],
      garden_area: [""],
    });
  }


  setTiles(value: any) {
    return this.hasTiles = value;
  } //je sais pas a quoi ca sert xD c'est grisé
  setGutter(value: any) {
    return this.hasGutter = value;
  }


  next() {
    this.formStep += 1;
    console.log(this.formStep);
  }

  submitForm() {

  }
}
