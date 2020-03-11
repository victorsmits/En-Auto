import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

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
