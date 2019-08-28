import { Component } from '@angular/core';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  constructor(public loginService: LoginService) {
    
   
  }
}
