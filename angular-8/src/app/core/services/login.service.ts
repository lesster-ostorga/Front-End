import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError as observableThrowError, of, observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  remember = false;
  baseurl: string = 'https://umgdemo.azurewebsites.net/api/login/authenticate';

  constructor(private http: HttpClient) {
    this.remember = JSON.parse(localStorage.getItem('remember'));

    if (this.remember) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userInfo')));
    } else {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('userInfo')));
    }

    this.currentUser = this.currentUserSubject.asObservable();
 
  }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
      /*'Authorization': `Bearer ${localStorage.getItem('token')}`*/
    })
  }


  
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get GetRemember(): boolean {
    return JSON.parse(localStorage.getItem('remember'));
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(this.baseurl, {
      Username: username,
      Password: password,
    }, this.httpOptions).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return observableThrowError(error.message || "Server Error");
  }


  loginUser(username: string, password: string, remember: boolean) {
    return this.http.post<any>(this.baseurl, { username, password }, this.httpOptions)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('remember', remember == true ? "true" : "false");

          if (remember == true) {
            localStorage.setItem('userInfo', JSON.stringify(user));
          } else {
            sessionStorage.setItem('userInfo', JSON.stringify(user));
          }
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  RolVisible(role: string) {
    const currentUser = JSON.parse(localStorage.getItem('userInfo'));
    var result = (currentUser.roles.indexOf(role) > -1);
    return result;
  }

  GetToken() {
    return this.currentUserSubject.value.token;
  }


  logout() {
    // remove user from local storage to log user out
    localStorage.clear();
    sessionStorage.clear();
    //localStorage.removeItem('userInfo');
    this.currentUserSubject.next(null);
  }

}
