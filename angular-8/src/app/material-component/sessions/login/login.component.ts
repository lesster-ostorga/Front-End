import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  reactiveForm: FormGroup;
  msgRes: string = "";
  checked = false;
  logout: string;
  msgLoading = "Log In";
  viewSpinner = false;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private loginService: LoginService) {
    this.reactiveForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false, []]
    });


    this.route.queryParamMap.subscribe(queryParams => {
      this.logout = queryParams.get("Logout")
    })

    console.log(this.logout);
    //console.log(this.loginService.GetRemember);
    if (this.logout == "true") {
      this.loginService.logout();
      this.router.navigate(['/login']);
      
    }
    else {
      // reset login status
      // redirect to home if already logged in
      if (this.loginService.currentUserValue && this.loginService.GetRemember == true) {
        this.router.navigate(['/starter']);
      }
      else {
        this.loginService.logout();
        this.router.navigate(['/login']);
         
      }
    }
  }

  ngOnInit() {

  }

  login() {
    this.msgRes = "";
    this.viewSpinner = true;
    this.msgLoading = "Loading...";
    this.loginService.loginUser(this.reactiveForm.value.username, this.reactiveForm.value.password, this.reactiveForm.value.remember)
      .pipe(first())
      .subscribe(
        data => {
          this.viewSpinner = false;
          this.msgLoading = "Log In";
          this.router.navigate(['/starter']);
        },
        (error: HttpErrorResponse) => {
          this.viewSpinner = false;
          this.msgLoading = "Log In";
          //console.log(error);
          this.msgRes = "Usuario y contraseña incorrectos";
        });
    
  }
}
