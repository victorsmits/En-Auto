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
    } if (roof == 1) { //tiles roof
      return (area * rain * 0.9) //en L par an
    }
  }

//cout éventuel de remplacement de tuiles
  tilesReparationCost(tiles: number): number {
    return tiles * 2;
  }
//cout de réparation evetuel de la goutiere
  gutterReparationCost(gutter: number): number {
    return gutter * 15;
  }

//calcule la consommation du foyer en L / an
  calc_conso(estiForm: FormGroup): number {
    //wc+Nettoyage+machines
    let conso: number;
    let people = estiForm.value["people"];
    let nb_machin = estiForm.value["nb_machin"];
    let garden_area = estiForm.value["garden_area"];

    conso = 42000 * people;
    console.log("machine: " + nb_machin);
    if (nb_machin > 0) {
      conso = conso + (nb_machin * 3500);
      console.log("conso2: " + conso);
    }
    if (garden_area > 0) {
      conso = conso + (garden_area * 70);
      console.log("conso3: " + conso);
    }
    return conso;
  }
//calcule du volument d'eau à stocker dans la citerne
  calc_vol_storage(water_volume: number, conso: number): number {
    let moy: number;
    moy = (conso + water_volume) / 2;
    return Math.round((moy * 21) / 365);
  }
//calcule le cout de la citerne en fonction du volume nécessaire à stocker et de son type
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
//calcule le cout total de l'installation pour en déduire sa rentabilité et la durée de l'amortissement
  totalCost(devis: Devis): Number {
    console.log(devis)
    return (devis.routing_cost.valueOf() + devis.structural_cost.valueOf() + devis.tank_cost.valueOf());
  }
//calcule l'économie d'eau en fonction du prix de l'eau
  calc_final_save(water_cost: number, water_volume: number) {
    return Math.round((water_volume) * water_cost);
  }

  calc_rentability(devis: Devis) {
    return (devis.total_cost.valueOf()/(5 * devis.final_save.valueOf()) * 100);
  }
}
