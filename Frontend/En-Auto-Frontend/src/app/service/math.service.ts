
import { Injectable } from '@angular/core';

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


}
