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
  
<<<<<<< HEAD
  baseurl: string = 'https://umgdemo.azurewebsites.net/api/Rescate';
  baseurl2:string = 'http://localhost:49220//api/Servicio'; 
=======
  //baseurl: string = 'http://localhost:49220/api/';
  baseurl: string = 'https://umgdemo.azurewebsites.net/api/';
>>>>>>> 0b7bec62d74b87ddea8ecb1ea73c5f419b49b6cb
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

<<<<<<< HEAD

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


  ImpresionServicio() {
    return this.http.get<any>("https://umgdemo.azurewebsites.net/api/FileServicio?Cod_Compania=44&NoControl=201935", this.httpOptions)
=======
  ImpresionServicio(Servicio: FormGroup) {
    return this.http.post<any>(this.baseurl + 'pdfServicio', Servicio, this.httpOptions)
>>>>>>> 0b7bec62d74b87ddea8ecb1ea73c5f419b49b6cb
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
