import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Perfil } from '../models/perfil.model';
import { User } from '../../../core/models/user';
import { fbind } from 'q';
import { LoginService } from '../../../core/services/login.service'
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';


@Injectable({
  providedIn: 'root'
})


export class ServicioPerfil {

  public tokenKey: string = 'usuario';

  readonly url = 'https://umgdemo.azurewebsites.net/api/usuarios/';
  perfil: Perfil;
 

  constructor(private http: HttpClient, private loginService: LoginService) { }
   // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginService.currentUserValue.token}`
    })
  }

  UsuarioList() {

    //var precio=sessionStorage.getItem(this.loginService.loginUser.name);

    //let storedToken = sessionStorage.getItem("usuario");

    this.http.get(this.url+this.loginService.currentUserValue.usuario  , this.httpOptions).toPromise().then(result => this.perfil = result as Perfil);


    // this.http.get(this.url + 'VoBo?id=44').toPromise().then(result=>this.listVoBo = result as Traslado[]);
    // his.http.get(this.url + 'Unidades?id=44').toPromise().then(result=>this.listUnidades = result as Traslado[]);
    // this.http.get(this.url + 'Pilotos?id=44').toPromise().then(result=>this.listPilotos = result as Traslado[]);
    // Prueba de api jalando datos 
    // tslint:disable-next-line: max-line-length
    // this.http.get(this.url + 'VoBo?id='+this.cod.currentUserValue.cod_compania).toPromise().then(result=>this.listVoBo = result as Traslado[])
  }



}





