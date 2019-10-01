import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import{ServicioPerfil} from '../profile/services/perfil.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private fb: FormBuilder, private serviceP: ServicioPerfil ) { 

    
  }

 
  ngOnInit() {
   
    this.serviceP.UsuarioList();
    //this.getDataUser();
  
  }
 // getDataUser(){
 //   this.profile.getInfoUser().subscribe((respuesta)=>console.log(respuesta));
 // }


 


}
