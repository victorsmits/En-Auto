import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {Devis, WaterCost} from "../Interface/Interface.module";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public ip = 'http://localhost:3000';

  constructor(public http: HttpClient) {
  }

  register(body) {
    return this.http.post(this.ip + '/users/register', body).pipe(
      catchError(this.handelError));
  }

  login(body) {
    return this.http.post(this.ip + '/users/login', body).pipe(
      catchError(this.handelError));
  }

  getProfile() {
    return this.http.get(this.ip + '/users/profile', {
      observe: 'body',
      params: new HttpParams().append('token', localStorage.getItem('token'))
    }).pipe(
      catchError(this.handelError));
  }

  createDevis(devis : Devis){
    return this.http.post(this.ip + '/devis', devis).pipe(
      catchError(this.handelError));
  }

  updateDevis(devis : Devis){
    return this.http.put(this.ip + '/devis', devis).pipe(
      catchError(this.handelError));
  }

  deleteDevis(devis : Devis){
    return this.http.delete(this.ip + '/devis', {
      observe: 'body',
      params : new HttpParams().append('_id',devis._id.toString())
    }).pipe(
      catchError(this.handelError));
  }

  getDevis(id){
    return this.http.get(this.ip + '/devis', {
      observe: 'body',
      params: new HttpParams().append('id_user', id)
    }).pipe(
      catchError(this.handelError));
  }

  getWaterCost(codepostal: any) {
    return this.http.get(this.ip + '/watercost', {
      observe: 'body',
      params: new HttpParams().append('postCode', codepostal)
    }).pipe(
      catchError(this.handelError));
  }

  createWaterCost(waterCost : WaterCost) {
    return this.http.post(this.ip + '/watercost', waterCost).pipe(
      catchError(this.handelError));
  }

  deleteWaterCost(_id : string) {
    return this.http.delete(this.ip + '/watercost', {
      observe: 'body',
      params: new HttpParams().append('_id', _id)
    }).pipe(
      catchError(this.handelError));
  }

  updateWaterCost(WaterCost : WaterCost) {
    return this.http.put(this.ip + '/watercost', WaterCost ).pipe(
      catchError(this.handelError));
  }

  handelError(err) {
    if (err instanceof HttpErrorResponse) {
      let error = new HttpErrorResponse(err);
      if (error.status == 500) {
        return throwError("Something bad happen, please try again later!");
      } else {
        return throwError(err.error.error);
      }
    } else {
      return throwError(err.message)
    }

  }


}
