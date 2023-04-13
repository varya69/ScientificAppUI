import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { logIn, SignUp } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn = new BehaviorSubject<boolean>(false)
  isLogginError = new EventEmitter<Boolean>(false)
  private apiUrl = 'http://localhost:8000/'; // replace with your API URL

  constructor(private http: HttpClient, private router: Router) { }

  signUp(data: SignUp) {
    console.log(data);
    return this.http.post(`${this.apiUrl}user/`, data, { observe: 'response' }).subscribe((result) => {     //Suscribing here for the authentication and in post request taking the observable 
      console.log(result)
      this.isUserLoggedIn.next(true)            // changing the value of the auth guard is true 
      localStorage.setItem('user', JSON.stringify(result.body))     //store the seller data in localstorage cause after refresh data cannot be vanished 
      this.router.navigate(['/'])
    })
    // console.log(data);
  }

  userLogin(data: logIn){
    return this.http.post(`${this.apiUrl}user-login/`, data , { observe: 'response' }).subscribe((res:any) => {
      // localStorage.setItem('token', res.token);
      console.log( res.body);
      if (res.status === 200 && res.body.message === 'Login successful'){
        localStorage.setItem('user', JSON.stringify(res.body))     //store the user data in localstorage cause after refresh data cannot be vanished 
        this.router.navigate(['/']) // Redirect the user to the dashboard or some other page
      }
      else{
        this.isLogginError.emit(true)
      }
      },
      error => {
        console.error(error);
        // Display an error message to the user
      }
    )
  }
}
