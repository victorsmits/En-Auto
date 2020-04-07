import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {ApiService} from '../service/api.service';
import {Devis} from '../Interface/Interface.module';
import {ToolsService} from '../service/tools.service';
import {MathService} from '../service/math.service';
import {StepperSelectionEvent} from '@angular/cdk/stepper';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.css']
})
export class EstimationComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper') stepper: MatStepper;

  public estiForm: FormGroup;
  choice: string;
  go_further: boolean = false;
  public finalDevis: Devis;

  water_volume: number;
  roof_cost: number;
  tiles_cost: number;
  gutter_cost: number;
  first_devis: boolean;

  water_cost: any;
  public final_save: number;

  constructor(public api: ApiService,
              public fb: FormBuilder,
              public tool: ToolsService,
              public math: MathService,
              public dialog: MatDialog,
              public router: Router) {
  }

  ngOnInit(): void {
    if ('devis' in sessionStorage && this.tool.isLoggedIn()) {
      this.saveDevis();
    }

    this.estiForm = this.fb.group({
      address: ['', [Validators.required, Validators.pattern('(\\d{1,}) [a-zA-Z0-9\\s]+(\\.)?')]],
      postalCode: [null, [Validators.required, Validators.pattern('[0-9]{5}')]],
      houseArea: ['', [Validators.required]],
      has_tiles: ['no'],
      tiles_nb: [null],
      roof_type: ['3'],
      has_gutter: ['no'],
      m_gutter: [null],
      use: ['garden'],
      know_consum: ['no'],
      consommation: [null],
      people: [null],
      nb_machin: [null],
      garden_area: [null],
      tank_type: ['not-dig'],
      tank_dist: [null]
    });
  }

  ngAfterViewInit(): void {
    this.tool.AuthStatusListener.subscribe(value => {
      if (value) {
        this.saveDevis();
      }
    });
  }

  computeFirstDevis() {
    let gutter = this.estiForm.value['m_gutter'];
    let tiles = this.estiForm.value['tiles_nb'];

    this.water_volume = this.math.roofWaterVolume(this.estiForm.value['houseArea'], 10, this.estiForm.value['roof_type']);

    this.tiles_cost = tiles != null ? this.math.tilesReparationCost(tiles) : 0;
    this.gutter_cost = gutter != null ? this.math.gutterReparationCost(gutter) : 0;

    this.api.getWaterCost(this.estiForm.value['postalCode']).subscribe(data => {
      if (data[0]) {
        this.water_cost = this.tool.setWaterCost(data[0]).cost;
      } else {
        this.water_cost = 0;
      }
    });
  }

  computeFinalDevis() {
    let consommation = this.estiForm.value['consommation'] ? this.estiForm.value['consommation'] : this.math.calc_conso(this.estiForm);
    let vol_storage = this.math.calc_vol_storage(this.water_volume, consommation);
    this.final_save = this.math.calc_final_save(this.water_cost, this.water_volume)

    this.finalDevis = {
      //required
      _id: this.estiForm.value['_id'] ? this.estiForm.value['_id'] : undefined,
      address: this.estiForm.value['address'] ? this.estiForm.value['address'] : undefined,
      code_postal: this.estiForm.value['postalCode'] ? this.estiForm.value['postalCode'] : undefined,
      id_user: this.tool.isLoggedIn() ? this.tool.getUser()._id : undefined,
      routing_cost: 100,
      water_cost: this.water_cost, //cout de l'eau recuperer sur BDD

      // non required
      tank_type: this.estiForm.value['tank_type'] ? this.estiForm.value['tank_type'] : undefined ,
      tank_dist: this.estiForm.value['tank_dist'] ? this.estiForm.value['tank_dist'] : undefined,
      roof_area: this.estiForm.value['houseArea'] ? this.estiForm.value['houseArea'] : undefined,
      tiles_number: this.estiForm.value['tiles_nb'] ? this.estiForm.value['tiles_nb'] : undefined,
      tiles_cost: this.tiles_cost,
      structural_cost: this.tiles_cost + this.gutter_cost,
      consum: consommation,
      water_volume: this.water_volume, //volume d'eau recupéré
      vol_storage: vol_storage,
      tank_cost: this.math.calc_cost_tank(this.estiForm, vol_storage),
      final_save: this.final_save,
      created_at: new Date(),
    };
    console.log("fin de boucle" + this.finalDevis)
    this.finalDevis.total_cost = this.math.totalCost(this.finalDevis);
    console.log(this.finalDevis)
    this.finalDevis.rentability = this.math.calc_rentability(this.finalDevis);
    console.log(this.finalDevis)
  }

  selectionChange($event: StepperSelectionEvent) {
    if ($event.selectedIndex == 3) {
      this.first_devis = true;
      this.computeFirstDevis();
    }
  }

  saveDevis() {
    if ('devis' in sessionStorage) {
      console.log(JSON.parse(sessionStorage.getItem('devis')));
      this.finalDevis = this.tool.setDevis(JSON.parse(sessionStorage.getItem('devis')));
      this.finalDevis.id_user = this.tool.getUser()._id;
      sessionStorage.removeItem('devis');
    }


    this.api.createDevis(this.finalDevis).subscribe(data => {
      if (data['message']) {
        this.tool.openSnackBar('Sauvegarde du Devis Effectuée', '');
        this.router.navigate(['profile']);
      }
    });
  }

  save() {
    if (!this.tool.isLoggedIn()) {
      sessionStorage.setItem('devis', JSON.stringify(this.finalDevis));
      this.router.navigate(['login']);
    } else {
      this.saveDevis();
    }
  }

  checkIfTank() {
    return this.estiForm.value['tank_dist'] === null || this.water_volume < 1000;
  }

  goFurther() {
    this.go_further = true;
    this.stepper.next()
  }
}
