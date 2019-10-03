import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { first, flatMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { RescateService } from '../../core/services/rescate.service.';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent {
  rptEstaMensual: FormGroup;
  msgrptEstaMensual = 'Imprimir';
  viewSpinnerImp = false;
  viewMsg = false;
  msgRes = '';

  typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  messages: any[] = [
    {
      from: 'Nirav joshi (nbj@gmail.com)',
      image: 'assets/images/users/1.jpg',
      subject: 'Material angular',
      content: 'This is the material angular template'
    },
    {
      from: 'Sunil joshi (sbj@gmail.com)',
      image: 'assets/images/users/2.jpg',
      subject: 'Wrappixel',
      content: 'We have wrappixel launched'
    },
    {
      from: 'Vishal Bhatt (bht@gmail.com)',
      image: 'assets/images/users/3.jpg',
      subject: 'Task list',
      content: 'This is the latest task hasbeen done'
    }
  ];

  folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16')
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16')
    },
    {
      name: 'Work',
      updated: new Date('1/28/16')
    }
  ];
  notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16')
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16')
    }
  ];

  constructor(private fb: FormBuilder, private loginService: LoginService, private ToastrService: ToastrService, private rescateService: RescateService) {
    this.rptEstaMensual = this.fb.group({
      Cod_Compania: [loginService.currentUserValue.cod_compania[0], [Validators.required]],
      Anio: ['', [Validators.required]],
      Mes: ['', [Validators.required]],
      Cod_TipoReporte: ['1']
    });
  }


  submitrptEstaMensual() {

    // stop here if form is invalid
    if (this.rptEstaMensual.invalid) {
      this.viewMsg = false;
      return;
    }


   




    this.msgrptEstaMensual = 'Descargando...';
    this.viewSpinnerImp = true;
    this.viewMsg = false;
    this.rescateService.ImpresionRptEstaMensual(this.rptEstaMensual.value)
      .pipe(first())
      .subscribe(
        data => {
          this.viewSpinnerImp = false;
          this.msgrptEstaMensual = "Imprimir"
          const linkSource = 'data:application/pdf;base64,' + data.msgRespuesta;
          const downloadLink = document.createElement("a");
          const fileName = this.rptEstaMensual.controls.Cod_Compania.value + "_" + this.rptEstaMensual.controls.Anio.value + "_" + this.rptEstaMensual.controls.Mes.value + ".pdf";
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();
        },
        (error: HttpErrorResponse) => {
          this.viewSpinnerImp = false;
          this.msgrptEstaMensual = "Imprimir"
          this.viewMsg = true;
          this.ToastrService.error(error.error.msgRespuesta == "undefined" ? "Ocurrió un error por favor intentarlo de nuevo o más tarde." : error.error.msgRespuesta, "Error en operación", {
            progressBar: true
          });
        });

  }
}
