import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public ip = 'http://localhost:3000';

  constructor(public http: HttpClient) { }

  register(body){
    return this.http.post(this.ip + '/user',body).pipe(
      catchError(this.handelError));
  }

  handelError(err){
    if(err instanceof HttpErrorResponse){
      let error = new HttpErrorResponse(err);
      if(error.status == 500){
        return throwError("Something bad happen, please try again later!");
      }else{
        return throwError(err.error.error);
      }
    } else{
      return throwError(err.message)
    }

  }
}
