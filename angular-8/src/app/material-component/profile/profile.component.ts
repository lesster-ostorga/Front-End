import { ProfileService } from './../../core/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private fb: FormBuilder, private profile: ProfileService) { }

  ngOnInit() {
    this.getDataUser();
  }
  getDataUser(){
    this.profile.getInfoUser().subscribe((respuesta)=>console.log(respuesta));
  }

}
