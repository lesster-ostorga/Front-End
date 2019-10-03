import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError as observableThrowError, of, observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ResponseMsg } from '../models/msgRes';
import { LoginService } from './login.service';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class RescateService {
  
  //baseurl: string = 'http://localhost:49220/api/';
  baseurl: string = 'https://umgdemo.azurewebsites.net/api/';
  baseurl2:string = 'https://umgdemo.azurewebsites.net/api/Servicio';
  private currentResponseMsgSubject: BehaviorSubject<ResponseMsg>;
  public currentResponseMsg: Observable<ResponseMsg>;

  constructor(private http: HttpClient, private loginService: LoginService) {
    
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginService.currentUserValue.token}`
    })
  }

  public get currentResponseMsgValue(): ResponseMsg {
    return this.currentResponseMsgSubject.value;
  }

  RescateSave(Servicio: FormGroup) {
    return this.http.post<any>(this.baseurl + 'Rescate', Servicio, this.httpOptions)
      .pipe(map(msgRes => {
        // login successful if there's a jwt token in the response
        if (msgRes && msgRes.codError == 0) {
          //console.log(msgRes);
          this.currentResponseMsgSubject.next(msgRes);
        }
        return msgRes;
      }));
  }

  edicionForm(Servicio: FormGroup) {
    return this.http.post<any>(this.baseurl2, Servicio, this.httpOptions)
      .pipe(map(msgRes => {
        // login successful if there's a jwt token in the response
        if (msgRes && msgRes.codError == 0) {
          console.log(msgRes);
          this.currentResponseMsgSubject.next(msgRes);
        }
        return msgRes;
      }));
  }

  ImpresionServicio(Servicio: FormGroup) {
    return this.http.post<any>(this.baseurl + 'pdfServicio', Servicio, this.httpOptions)
      .pipe(map(msgRes => {
        // login successful if there's a jwt token in the response
        if (msgRes && msgRes.codError == 0) {
          //console.log(msgRes);
          this.currentResponseMsgSubject.next(msgRes);
        }
        return msgRes;
      }));
  }

  ImpresionRptEstaMensual(rptForm: FormGroup) {
    return this.http.post<any>(this.baseurl + 'rptEstadisticoMesual', rptForm, this.httpOptions)
      .pipe(map(msgRes => {
        // login successful if there's a jwt token in the response
        if (msgRes && msgRes.codError == 0) {
          //console.log(msgRes);
          this.currentResponseMsgSubject.next(msgRes);
        }
        return msgRes;
      }));
  }
}
