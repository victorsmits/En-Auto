import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor() { }

  roofWaterVolume(area: number,rain: number): number{
    return (area * rain) * (10 ** -3)
  }
}
