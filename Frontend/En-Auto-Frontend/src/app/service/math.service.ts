
import { Injectable } from '@angular/core';
import {Devis} from "../Interface/Interface.module";

@Injectable({
  providedIn: 'root'
})

export class MathService {

  constructor() {}
//Volume d’eau récupéré (en L/an)= Précipitations (en L/m²/an)* Surface de la toiture* Coefficient de pertes (en fonction du type de toiture)
  //conversion en L
  roofWaterVolume(area: number,rain: number, roof: number): number{
    //corrugated roof
    if (roof == 2) {
      return (area * rain * 0.8) * (10 ** -3)
    }
    //flat roof
    if(roof == 3) {
      return (area * rain * 0.6) * (10 ** -3)
    } else { //tiles roof
      return (area * rain * 0.9) * (10 ** -3)
    }
  }

//cout tuile
  tilesReparationCost(tiles:number) : number{
    return tiles * 2;
  }

  gutterReparationCost(gutter:number) : number{
    return gutter * 15;
  }

  calc_conso(people:number, nb_machin:number, garden_area: number) : number {
    //wc+Nettoyage+machines
    let conso: number;
    conso = 8500 * people + 1100 * people;
    console.log("machine: "+nb_machin);
    if (nb_machin > 0) {
      conso = conso + (nb_machin * 3500);
      console.log("conso: " + conso);
    }
    if(garden_area>0) {
      conso = conso + (garden_area*70);
      console.log("conso: " + conso);
    }
    return conso;
  }

  totalCost(devis: Devis) : number {
     return (devis.routing_cost.valueOf() + devis.structural_cost.valueOf() + devis.tank_cost.valueOf() + devis.water_cost.valueOf()*devis.consum.valueOf());
  }

}
