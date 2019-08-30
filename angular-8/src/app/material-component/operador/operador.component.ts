import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { RescateService } from '../../core/services/rescate.service.';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { LoginService } from '../../core/services/login.service';
import {Serviciotraslado} from '../operador/services/traslado.service';
@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: ['./operador.component.scss'],
  // add NgbAlertConfig  to the component providers
  providers: [NgbAlertConfig]
})
export class OperadorComponent implements OnInit {

  time = { hour: 0, minute: 0, second: 0 };
  seconds = false;
  viewMsg = false;
  msgRes: string;
  alertType: string = "success";
  Servicio: FormGroup;
  data = {
    Per_Aten: [
      {
        Nombre: "",
        Edad: "",
        Domicilio: "",
        Cod_Ubi_Traslado: ""
      }
    ],
    Uni_Asi: [
      {
        Cod_Unidad: "",
        Carnet_Piloto: ""
      }
    ],
    Per_Des: [
      {
        Carnet: ""
      }
    ]
  };

  constructor(private fb: FormBuilder, private calendar: NgbCalendar, private rescateService: RescateService, private loginService: LoginService,private service: Serviciotraslado) {

    this.Servicio = this.fb.group({
      NoControl: ['', [Validators.required]],
      Cod_Compania: ['', [Validators.required]],
      Cod_Servicio: ['', [Validators.required]],
      Min_Trabajados: ['', [Validators.required]],
      Fecha_Servicio: ['', [Validators.required]],
      Nombre_Solicitante: ['', [Validators.required]],
      Direccion: ['', [Validators.required]],
      Cod_TipoAviso: ['', [Validators.required]],
      Cod_Compania_Salida: ['', [Validators.required]],
      Fecha_Salida: ["", [Validators.required]],
      Hora_Salida: [this.time, [Validators.required]],
      Cod_Compania_Entrada: ['', [Validators.required]],
      Fecha_Entrada: ['', [Validators.required]],
      Hora_Entrada: [this.time, [Validators.required]],
      Carnet_RadioTelefonista: ['', [Validators.required]],
      Observaciones: ['', [Validators.required]],
      //Razon: ['S/R', [Validators.required]],
      Carnet_FormuladoPor: ['', [Validators.required]],
      Carnet_ConformePiloto: ['', [Validators.required]],
      Carnet_VoBo: ['', [Validators.required]],
      Fecha_Firma: ['', [Validators.required]],
      //Usuario_Registra: [this.loginService.currentUserValue.usuario.toUpperCase(), [Validators.required]],
      //Fecha_Imprime: ['', [Validators.required]],
      Persona_Atendida: this.fb.array([]),
      Unidad_Asiste: this.fb.array([]),
      Persona_Destacada: this.fb.array([])
    });
    /*devolvemr un array con los cod_compania de usuario */
    console.log(this.loginService.currentUserValue.cod_compania)
    this.setProyects();

  }

  //Angular Reactive Forms with nested Form Arrays
  //https://stackblitz.com/edit/angular-dffny7?file=app/app.component.html
  //https://ng-bootstrap.github.io/#/components/timepicker/examples
  //https://material.angular.io/components/categories


  addNewPerAte(control) {
    control.push(
      this.fb.group({
        Nombre: ['', [Validators.required]],
        Edad: ['', [Validators.required]],
        Domicilio: ['', [Validators.required]],
        Cod_Ubi_Traslado: ['', [Validators.required]]
      }))
  }

  addNewUniAsi(control) {
    control.push(
      this.fb.group({
        Cod_Unidad: ['', [Validators.required]],
        Carnet_Piloto: ['', [Validators.required]],
      }))
  }

  deleteUniAsi(control, index) {
    control.removeAt(index)
  }

  addNewPerDes(control) {
    control.push(
      this.fb.group({
        Carnet: ['', [Validators.required]]
      }))
  }

  deletePerDes(control, index) {
    control.removeAt(index)
  }

  deletePerAte(control, index) {
    control.removeAt(index)
  }

  deletePerAten(control, index) {
    control.removeAt(index)
  }

  setProyects() {
    let controlPer_Aten = <FormArray>this.Servicio.controls.Persona_Atendida;
    this.data.Per_Aten.forEach(x => {
      controlPer_Aten.push(this.fb.group({
        Nombre: x.Nombre,
        Edad: x.Edad,
        Domicilio: x.Domicilio,
        Cod_Ubi_Traslado: x.Cod_Ubi_Traslado
      }))
    })

    let controlUni_Asi = <FormArray>this.Servicio.controls.Unidad_Asiste;
    this.data.Uni_Asi.forEach(x => {
      controlUni_Asi.push(this.fb.group({
        Cod_Unidad: x.Cod_Unidad,
        Carnet_Piloto: x.Carnet_Piloto
      }))
    })

    let controlPer_Des = <FormArray>this.Servicio.controls.Persona_Destacada;
    this.data.Per_Des.forEach(x => {
      controlPer_Des.push(this.fb.group({
        Carnet: x.Carnet
      }))
    })
  }

  ngOnInit() {
    this.service.TrasladoList();
  }


  submit() {
    //this.showToast();
    // Make sure to create a deep copy of the form-model
    this.msgRes = "";

    // stop here if form is invalid
    if (this.Servicio.invalid || this.Servicio.controls.Persona_Atendida.invalid || this.Servicio.controls.Unidad_Asiste.invalid || this.Servicio.controls.Persona_Destacada.invalid) {
      this.viewMsg = false;
      return;
    }

    
    this.rescateService.RescateSave(this.Servicio.value)
      .pipe(first())
      .subscribe(
        data => {
          //this.router.navigate(['/starter']);
          this.viewMsg = true;
          this.alertType = "success";
          this.msgRes = data.msgRespuesta;
          this.Servicio.reset();
          //console.log(data);
        },
        (error: HttpErrorResponse) => {
          //console.log(error);
          this.viewMsg = true;
          this.alertType = "danger";
          this.msgRes = error.error.codError + ": " + error.error.msgRespuesta;
        });
    // Do useful stuff with the gathered data
    //console.log(this.Servicio.value);

  }

  showToast() {
    //this.toastr.success('asdfasdf');
  }

  getErrorMessage(form: FormGroup) {
    return form.get('email').hasError('required')
      ? 'You must enter a value'
      : form.get('email').hasError('email')
        ? 'Not a valid email'
        : '';
  }


}
