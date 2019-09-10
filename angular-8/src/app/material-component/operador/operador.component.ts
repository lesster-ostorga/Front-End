import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { NgbDateStruct, NgbCalendar, NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { RescateService } from '../../core/services/rescate.service.';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { LoginService } from '../../core/services/login.service';
import { Serviciotraslado } from '../operador/services/traslado.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: ['./operador.component.scss'],
  // add NgbAlertConfig  to the component providers
  providers: [NgbAlertConfig]
})
export class OperadorComponent implements OnInit {

  time = { hour: 0, minute: 0, second: 0 };
  OcultaPerAtendida = false;
  seconds = false;
  viewMsg = false;
  msgRes: string;
  alertType = 'success';
  Servicio: FormGroup;
  msgLoading = 'Guardar Servicio';
  viewSpinner = false;
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
    ],

    Inc_Vehiculo: [
      {
        Propietario_Veh: ""

      }
    ],
  
    Inc_Inmueble: [
      {
        Propietario_Inm: "",
        Lugar_Inincio_Incendio: "",
        Cod_Causa: "",
        Valor_Aproximado_Inm: "",
        Compania_Aseguradora: "",
        Perdida_Aproximado_Inm: ""
      }
    ],

  };


  constructor(private fb: FormBuilder, private calendar: NgbCalendar,
    private rescateService: RescateService, private loginService: LoginService, private service: Serviciotraslado, private ToastrService: ToastrService) {
    this.service.TrasladoList();
    this.Servicio = this.fb.group({
      NoControl: ['', [Validators.required]],
      Cod_Compania: [loginService.currentUserValue.cod_compania[0], [Validators.required]],
      Cod_Servicio: ['', [Validators.required]],
      Cod_Clase_Servicio: ['', [Validators.required]],
      Min_Trabajados: ['', [Validators.required]],
      Fecha_Servicio: ['', [Validators.required]],
      Nombre_Solicitante: ['', [Validators.required]],
      Cod_Depto: ['1302', [Validators.required]],
      Cod_Muni: ['', [Validators.required]],
      Area: ['', [Validators.required]],
      Cod_Lugar: [''],
      Zona: [''],
      Direccion: ['', [Validators.required]],
      Cod_TipoAviso: ['', [Validators.required]],
      Cod_Compania_Salida: [loginService.currentUserValue.cod_compania[0], [Validators.required]],
      Fecha_Salida: ['', [Validators.required]],
      Hora_Salida: [this.time, [Validators.required]],
      Cod_Compania_Entrada: [loginService.currentUserValue.cod_compania[0], [Validators.required]],
      Fecha_Entrada: ['', [Validators.required]],
      Hora_Entrada: [this.time, [Validators.required]],
      Carnet_RadioTelefonista: ['', [Validators.required]],
      Observaciones: ['', [Validators.required]],
      // Razon: ['S/R', [Validators.required]],
      Carnet_FormuladoPor: ['', [Validators.required]],
      Carnet_ConformePiloto: ['', [Validators.required]],
      Carnet_VoBo: ['', [Validators.required]],
      Fecha_Firma: ['', [Validators.required]],
      // Usuario_Registra: [this.loginService.currentUserValue.usuario.toUpperCase(), [Validators.required]],
      // Fecha_Imprime: ['', [Validators.required]],
      Persona_Atendida: this.fb.array([]),
      Unidad_Asiste: this.fb.array([]),
      Persona_Destacada: this.fb.array([]),
      Inmueble: this.fb.array([]),
      Vehiculo: this.fb.array([])
          });
    /*devolvemr un array con los cod_compania de usuario */
    // console.log(this.loginService.currentUserValue.cod_compania)
    this.setDataInicial();
    this.getmunicipio("1302");

  }
  // es solo prueba de versionamiento

  // Angular Reactive Forms with nested Form Arrays
  // https://stackblitz.com/edit/angular-dffny7?file=app/app.component.html
  // https://ng-bootstrap.github.io/#/components/timepicker/examples
  // https://material.angular.io/components/categories


  addNewPerAte(control) {
    control.push(
      this.fb.group({
        Nombre: ['', [Validators.required]],
        Edad: ['', [Validators.required]],
        Domicilio: ['', [Validators.required]],
        Cod_Ubi_Traslado: ['', [Validators.required]]
      }))
  }

  addNewInmueble(control) {
    control.push(
      this.fb.group({
        Propietario_Inm: ['', [Validators.required]],
        Lugar_Inincio_Incendio: ['', [Validators.required]],
        Cod_Causas: ['', [Validators.required]],
        Valor_Aproximado_Inm: ['', [Validators.required]],
        Perdida_Aproximado_Inm: ['', [Validators.required]],
        Compania_Aseguradora: ['', [Validators.required]]
              }))
  }

  addNewVehiculo(control) {
    control.push(
      this.fb.group({
        Propietario_Veh: ['', [Validators.required]],
        Conductor: ['', [Validators.required]],
        Descripcion: ['', [Validators.required]],
        Marco: ['', [Validators.required]],
        Modelo: ['', [Validators.required]],
        Placas: ['', [Validators.required]],
        Valor_Aproximado_Vehiculo: ['', [Validators.required]],
        Perdida_Aproximado_Vehiculo: ['', [Validators.required]],   
        Compañia_Aseguradora: ['', [Validators.required]]     
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

  deleteInmueble(control, index) {
    control.removeAt(index)
  }

  deleteVehiculo(control, index) {
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


  setDataInicial() {
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

    let controlInc_Vehiculo = <FormArray>this.Servicio.controls.Vehiculo;
    this.data.Inc_Vehiculo.forEach(x => {
      controlInc_Vehiculo.push(this.fb.group({
        Propietario_Veh: x.Propietario_Veh
      }))
    })

    let controlInc_Inmueble = <FormArray>this.Servicio.controls.Inmueble;
    this.data.Inc_Inmueble.forEach(x => {
      controlInc_Inmueble.push(this.fb.group({
        Propietario_Inm: x.Propietario_Inm,
        Lugar_Inincio_Incendio: x.Lugar_Inincio_Incendio,
        Cod_Causa: x.Cod_Causa,
        Valor_Aproximado_Inm: x.Valor_Aproximado_Inm,
        Perdida_Aproximado_Inm: x.Perdida_Aproximado_Inm,
        Compania_Aseguradora: x.Compania_Aseguradora
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

  }

  getmunicipio(cod_depto: string) {
    // alert('hola departamento ' +cod_depto);
    let CodMuni = <FormControl>this.Servicio.controls.Cod_Muni;
    let CodLugar = <FormControl>this.Servicio.controls.Cod_Lugar;
    let CodArea = <FormControl>this.Servicio.controls.Area;
    CodMuni.setValue("");
    CodLugar.setValue("");
    CodArea.setValue("");
    this.service.muni(cod_depto);
  }

  getdatamunicipio(cod_muni: string) {
    // alert('hola departamento ' +cod_depto);
    let CodLugar = <FormControl>this.Servicio.controls.Cod_Lugar;
    CodLugar.setValue("");
    if (this.Servicio.controls.Area.value !== '') {
      this.service.datamuni(cod_muni, this.Servicio.controls.Area.value);
    }
  }

  getdatamunicipio2() {
    // alert('hola departamento ' +cod_depto);
    let CodLugar = <FormControl>this.Servicio.controls.Cod_Lugar;
    CodLugar.setValue("");
    if (this.Servicio.controls.Cod_Muni.value !== '') {
      this.service.datamuni(this.Servicio.controls.Cod_Muni.value, this.Servicio.controls.Area.value);
    } else {

    }

  }

  submit() {
    // this.showToast();
    // Make sure to create a deep copy of the form-model
    this.msgRes = "";

    // stop here if form is invalid
    if (this.Servicio.invalid || this.Servicio.controls.Persona_Atendida.invalid
      || this.Servicio.controls.Unidad_Asiste.invalid || this.Servicio.controls.Persona_Destacada.invalid) {
      this.viewMsg = false;
      return;
    }

    this.viewSpinner = true;
    this.msgLoading = "Procesando...";
    this.rescateService.RescateSave(this.Servicio.value)
      .pipe(first())
      .subscribe(
        data => {
          //this.router.navigate(['/starter']);
          this.viewMsg = true;
          this.alertType = "success";
          this.viewSpinner = false;
          this.msgLoading = "Guardar Servicio";
          this.msgRes = data.msgRespuesta;
          this.Servicio.reset();
          this.ToastrService.success(this.msgRes, "Servicio Guardado", {
            progressBar: true
          });
        },
        (error: HttpErrorResponse) => {
          this.viewMsg = true;
          this.alertType = "danger";
          this.viewSpinner = false;
          this.msgLoading = "Guardar Servicio";
          console.log(error);
          this.ToastrService.error(error.error.msgRespuesta == "undefined" ? "Ocurrió un error por favor vuelta a iniciar sesión para intentarlo de nuevo." : error.error.msgRespuesta, "Error en operación", {
            progressBar: true
          });
          this.msgRes = error.error.msgRespuesta == "undefined" ? "Ocurrió un error por favor vuelta a iniciar sesión para intentarlo de nuevo." : error.error.codError + ": " + error.error.msgRespuesta;
        });
  }

  showToast() {
    // this.toastr.success('asdfasdf');
  }

  getErrorMessage(form: FormGroup) {
    return form.get('email').hasError('required')
      ? 'You must enter a value'
      : form.get('email').hasError('email')
        ? 'Not a valid email'
        : '';
  }


}
