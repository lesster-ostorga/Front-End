import { Component } from '@angular/core';
import { LoginService } from '../../../core/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  constructor(public loginService: LoginService,private router: Router) {
    
   
  }

  viewProfile(){
    this.router.navigate(['/profile']);
  }
}
