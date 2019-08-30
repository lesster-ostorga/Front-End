import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private login: LoginService) { }
  headers : HttpHeaders = new HttpHeaders({
    "Content-Type":"application/json",
    "Authorization": this.login.GetToken(),
  })

  getInfoUser(){
    const url_api = "https://umgdemo.azurewebsites.net/api/usuarios/User3";
      return this.http.get(url_api,{headers: this.headers});
  }
}
