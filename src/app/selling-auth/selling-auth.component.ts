import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { logIn, SignUp } from '../data-types';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-selling-auth',
  templateUrl: './selling-auth.component.html',
  styleUrls: ['./selling-auth.component.scss']
})
export class SellingAuthComponent implements OnInit {

  constructor(private sellerService : SellerService, private router: Router) { }
  authError:String = ""
  showLogin = false

  ngOnInit(): void{
    this.sellerService.relaodSeller()
  }

  signUp(data: SignUp):void{
    console.log(data);
    this.sellerService.signUp(data)
  }

  openLogin(){
    this.showLogin = true
  }
  
  openSignUp(){
    this.showLogin = false
  }

  sellerLogin(data: logIn){
    console.log(data);
    this.sellerService.sellerLogin(data)
    this.sellerService.isLogginError.subscribe((isError: any) => {
      if(isError){
        this.authError = "Inavild Credentials Error"
      }
    } )
    setTimeout(() => {
      this.authError = '';
    }, 5000);
  }
}
