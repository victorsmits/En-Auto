
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MathService {

  constructor() {}

  roofWaterVolume(area: number,rain: number): number{
    return (area * rain) * (10 ** -3);
  }

  tilesReparationCost(tiles:number) : number{
    return tiles * 2;
  }

  gutterReparationCost(gutter:number) : number{
    return gutter * 15;
  }
}
