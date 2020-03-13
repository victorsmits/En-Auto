import {AfterViewInit, Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import {ApiService} from "../service/api.service";
import {Devis} from "../Interface/Interface.module";
import {ToolsService} from "../service/tools.service";
import {MathService} from "../service/math.service";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {RegisterComponent} from "../register/register.component";
import {Router} from "@angular/router";
import {$e} from "codelyzer/angular/styles/chars";

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.css']
})
export class EstimationComponent implements OnInit, AfterViewInit {

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
  roof: number;

  constructor(public api: ApiService,
              public fb: FormBuilder,
              public tool: ToolsService,
              public math: MathService,
              public dialog: MatDialog,
              public router: Router) {
  }

  ngOnInit(): void {
    if ("devis" in sessionStorage && this.tool.isLoggedIn()) {
      this.saveDevis()
    }


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
      tank_type: [null],
      tank_dist: [null]
    });
  }

  ngAfterViewInit(): void {
    this.tool.AuthStatusListener.subscribe(value => {
      if (value) {
        this.saveDevis()
      }
    })
  }

  // Form Question control

  setTiles(value: any) {
    return this.hasTiles = value;
  }

  setGutter(value: any) {
    return this.hasGutter = value;
  }

  setType(value: any) {
    return this.roof = value;
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

    this.tiles_cost = tiles != null ? this.math.tilesReparationCost(tiles) : 0;
    this.gutter_cost = gutter != null ? this.math.gutterReparationCost(gutter) : 0;

    this.water_volume = this.math.roofWaterVolume(this.estiForm.value["houseArea"], 10, this.roof);
    console.log(this.water_volume);
    this.roof_cost = this.tiles_cost + this.gutter_cost;
  }

  computeFinalDevis() {
    let water;
    this.api.getWaterCost(this.estiForm.value["postalCode"]).subscribe(data => {
      if (data[0]) {
        water = this.tool.setWaterCost(data[0]).cost
      } else {
        water = 4;
      }
      this.finalDevis = {
        _id: this.estiForm.value["_id"] ? this.estiForm.value["_id"] : undefined,
        address: this.estiForm.value["address"] ? this.estiForm.value["address"] : undefined,
        code_postal: this.estiForm.value["postalCode"] ? this.estiForm.value["postalCode"] : undefined,
        id_user: this.tool.isLoggedIn() ? this.tool.getUser()._id : undefined,
        structural_cost: this.roof_cost,
        routing_cost: 10,
        tank_cost: 10,
        consum: this.estiForm.value["consommation"] ? this.estiForm.value["consommation"] : undefined,
        water_cost: water,
        water_volume: this.water_volume,
        roof_area: this.estiForm.value["houseArea"] ? this.estiForm.value["houseArea"] : undefined,
        final_save: this.estiForm.value["final_save"] ? this.estiForm.value["final_save"] : undefined,
        rentability: undefined,
        created_at: this.estiForm.value["created_at"] ? this.estiForm.value["created_at"] : new Date(),
      }
    });

  }

  selectionChange($event: StepperSelectionEvent) {
    console.log(this.estiForm.value);
    if ($event.selectedIndex == 3) {
      this.computeFirstDevis();
    }
    if (this.estiForm.value["tank_type"] != null) {
      this.computeFinalDevis()
    }
    console.log($event.selectedIndex);
  }

  saveDevis() {
    if ("devis" in sessionStorage) {
      console.log(JSON.parse(sessionStorage.getItem("devis")));
      this.finalDevis = this.tool.setDevis(JSON.parse(sessionStorage.getItem("devis")));
      this.finalDevis.id_user = this.tool.getUser()._id;
      console.log(this.finalDevis);
      sessionStorage.removeItem("devis");
    }
    this.api.createDevis(this.finalDevis).subscribe(data => {
      if (data["message"]) {
        console.log(data["message"])
      }
    })
  }

  save() {
    if (!this.tool.isLoggedIn()) {
      sessionStorage.setItem('devis', JSON.stringify(this.finalDevis));
      this.router.navigate(['login'])
    } else {
      this.saveDevis();
    }
  }

  send() {

  }
}
