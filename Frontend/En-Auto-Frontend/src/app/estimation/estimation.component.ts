import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import {ApiService} from "../service/api.service";
import {Devis} from "../Interface/Interface.module";
import {ToolsService} from "../service/tools.service";
import {MathService} from "../service/math.service";
import {StepperSelectionEvent} from "@angular/cdk/stepper";

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.css']
})
export class EstimationComponent implements OnInit {

  public estiForm: FormGroup;
  hasTiles: string;
  hasGutter: string;
  knowConsommation: string;
  choice: string;
  formStep = 0;
  goFurther: boolean = false;
  public finalDevis: Devis;

  water_volume: number;
  roof_cost: number;
  tiles_cost: number;
  gutter_cost: number;


  constructor(public api: ApiService,
              public fb: FormBuilder,
              public tool: ToolsService,
              public math: MathService) {
  }

  ngOnInit(): void {
    this.estiForm = this.fb.group({
      address: ["", [Validators.required]],
      postalCode: ["", [Validators.required]],
      houseArea: ["", [Validators.required]],
      tiles_nb: [null],
      m_gutter: [null],
      consommation: [null],
      people: [null],
      nb_machin: [null],
      garden_area: [null],
    });
  }

  // Loading bar

  get Status(): number {
    if (this.formStep <= 2) {
      return this.formStep * 50
    } else {
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

  computeFirstDevis() {
    console.log(this.estiForm.value);
    let gutter = this.estiForm.value["m_gutter"];
    let tiles = this.estiForm.value["tiles_nb"];

    this.tiles_cost = tiles != null? this.math.tilesReparationCost(tiles): 0;
    this.gutter_cost = gutter != null ? this.math.gutterReparationCost(gutter) : 0;

    this.water_volume = this.math.roofWaterVolume(this.estiForm.value["houseArea"], 10);
    this.roof_cost = this.tiles_cost + this.gutter_cost;
  }

  // Form Navigation
  submitForm() {
    if (this.estiForm.valid) {

    }
  }

  selectionChange($event: StepperSelectionEvent) {
    if($event.selectedIndex == 3){
      this.computeFirstDevis();
    }
  }
}
