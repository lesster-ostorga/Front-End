import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catalogosRescate } from '../models/traslado.model';
import { User } from '../../../core/models/user';
import { fbind } from 'q';
import { LoginService } from '../../../core/services/login.service'


@Injectable({
  providedIn: 'root'
})


export class Serviciotraslado {

  readonly url = 'https://umgdemo.azurewebsites.net/api/Catalogos';
  listCatalogoRescate: catalogosRescate;
  //listVoBo : Traslado[];
  //listUnidades : Traslado[];
  //listPilotos : Traslado[];
  // cod: LoginService;

  constructor(private http: HttpClient, private loginService: LoginService) { }
   // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginService.currentUserValue.token}`
    })
  }

  TrasladoList() {

    this.http.get(this.url, this.httpOptions).toPromise().then(result => this.listCatalogoRescate = result as catalogosRescate);
    //this.http.get(this.url + 'VoBo?id=44').toPromise().then(result=>this.listVoBo = result as Traslado[]);
    //his.http.get(this.url + 'Unidades?id=44').toPromise().then(result=>this.listUnidades = result as Traslado[]);
    //this.http.get(this.url + 'Pilotos?id=44').toPromise().then(result=>this.listPilotos = result as Traslado[]);
    //Prueba de api jalando datos 
    //this.http.get(this.url + 'VoBo?id='+this.cod.currentUserValue.cod_compania).toPromise().then(result=>this.listVoBo = result as Traslado[])

  }


}





