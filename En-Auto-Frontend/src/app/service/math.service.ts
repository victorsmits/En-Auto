import {Injectable} from '@angular/core';
import {Devis} from "../Interface/Interface.module";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class MathService {

  constructor() {
  }

//Volume d’eau récupéré (en L/an)= Précipitation (en L/m²/an)* Surface de la toiture(m2) * Coefficient de perte (en fonction du type de toiture)
  //conversion en L
  roofWaterVolume(area: number, rain: number, roof: number): number {
    //corrugated roof
    if (roof == 2) {
      return (area * rain * 0.8) //en L par an
    }
    //flat roof
    if (roof == 3) {
      return (area * rain * 0.6) //en L par an
    } else { //tiles roof
      return (area * rain * 0.9) //en L par an
    }
  }

//cout tuile
  tilesReparationCost(tiles: number): number {
    return tiles * 2;
  }

  gutterReparationCost(gutter: number): number {
    return gutter * 15;
  }

//calcule la consommation du foyer
  calc_conso(estiForm: FormGroup): number {
    //wc+Nettoyage+machines
    let conso: number;
    let people = estiForm.value["people"];
    let nb_machin = estiForm.value["nb_machin"];
    let garden_area = estiForm.value["garden_area"];

    conso = 8500 * people + 1100 * people;
    console.log("machine: " + nb_machin);
    if (nb_machin > 0) {
      conso = conso + (nb_machin * 3500);
      console.log("conso: " + conso);
    }
    if (garden_area > 0) {
      conso = conso + (garden_area * 70);
      console.log("conso: " + conso);
    }
    return conso;
  }

  calc_vol_storage(water_volume: number, conso: number): number {
    let moy: number;
    moy = (conso + water_volume) / 2;
    var resultat = (moy * 21) / 365
    var around = Math.round(resultat);
    return around;
  }

  calc_cost_tank(estiForm: FormGroup, vol: number): number {
    let cost: number;

    if (estiForm.value["tank_type"].match("dig")) {
      if (vol <= 1500) {
        cost = 1900;
      }
      if ((vol > 1500) && (vol <= 3000)) {
        cost = 2600;
      }
      if ((vol > 3000) && (vol <= 5000)) {
        cost = 3000;
      }
      if (vol > 5000) {
        cost = 3800;
      }
    } else if (estiForm.value["tank_type"].match("not-dig")) {
      if (vol <= 400) {
        cost = 200;
      } else
        cost = 500;
    }
    cost = cost + estiForm.value["tank_dist"] * 50;
    return (cost);
  }

  totalCost(devis: Devis): Number {
    console.log(devis)
    return (devis.routing_cost.valueOf() + devis.structural_cost.valueOf() + devis.tank_cost.valueOf()
      + devis.water_cost.valueOf() * devis.consum.valueOf());
  }

  calc_final_save(water_cost: number, water_volume: number) {
    return Math.round((water_volume / 4) * water_cost);
  }

  calc_rentability(finalDevis: Devis) {
    return 0;
  }
}
