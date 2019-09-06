import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catalogosRescate, Municipio, Lugar } from '../models/traslado.model';
import { User } from '../../../core/models/user';
import { fbind } from 'q';
import { LoginService } from '../../../core/services/login.service'


@Injectable({
  providedIn: 'root'
})


export class Serviciotraslado {

  readonly url = 'https://umgdemo.azurewebsites.net/api/catalogos/';
  listCatalogoRescate: catalogosRescate;
  // listVoBo : Municipio[];
  // listUnidades : Traslado[];
  // listPilotos : Traslado[];
  // cod: LoginService;

  municipio: Municipio[];
  lugar: Lugar[];

  constructor(private http: HttpClient, private loginService: LoginService) { }
   // Http Headers
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginService.currentUserValue.token}`
    })
  }

  TrasladoList() {

    this.http.get(this.url+'general', this.httpOptions).toPromise().then(result => this.listCatalogoRescate = result as catalogosRescate);

    // this.http.get(this.url + 'VoBo?id=44').toPromise().then(result=>this.listVoBo = result as Traslado[]);
    // his.http.get(this.url + 'Unidades?id=44').toPromise().then(result=>this.listUnidades = result as Traslado[]);
    // this.http.get(this.url + 'Pilotos?id=44').toPromise().then(result=>this.listPilotos = result as Traslado[]);
    // Prueba de api jalando datos 
    // tslint:disable-next-line: max-line-length
    // this.http.get(this.url + 'VoBo?id='+this.cod.currentUserValue.cod_compania).toPromise().then(result=>this.listVoBo = result as Traslado[])

  }

  


  muni(cod: string) {
   this.lugar = [];
   this.http.get(this.url + 'Municipios?id=' + cod, this.httpOptions)
   .toPromise().then(result => this.municipio = result as Municipio[]);
  }

  datamuni(cod: string, area: any) {
    this.http.get(this.url + 'datosMunicipios?id=' + cod + '&area=' + area, this.httpOptions)
    .toPromise().then(result => this.lugar = result as Lugar[]);
   }

}





