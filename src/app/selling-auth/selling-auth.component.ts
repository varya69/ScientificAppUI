import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, logIn, Product, SignUp } from '../data-types';
import { SellerService } from '../services/seller.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-selling-auth',
  templateUrl: './selling-auth.component.html',
  styleUrls: ['./selling-auth.component.scss']
})
export class SellingAuthComponent implements OnInit {

  role: string = 'user';
  isUser: boolean = true;
  // isSeller: boolean = false;

  constructor(private sellerService : SellerService, private router: Router, 
    private userService : UserService) { }
  authError:String = ""
  showLogin = false

  ngOnInit(): void{
    this.sellerService.relaodSeller()
  }

  signUp(data: SignUp):void{
    console.log(data);
    if (this.role === 'user') {
      this.isUser = true
      this.userService.signUp(data)
    } else if (this.role === 'seller'){ 
      this.isUser = false 
      this.sellerService.signUp(data)
    }
  }
  
  openLogin(){
    this.showLogin = true
  }
  
  openSignUp(){
    this.showLogin = false
  }
  
  
  Login(data: logIn){
    console.log(data);
    if (this.role === 'user') {
      // Handle user login/signup
      this.isUser = true
      this.userService.userLogin(data)
      this.userService.isLogginError.subscribe((isError: any) => {
        if(isError){
          this.authError = "Inavild Credentials Error"
        }
      } )
      setTimeout(() => {
        this.authError = '';
      }, 5000);
    } else if (this.role === 'seller') {
      // Handle seller login/signup
      this.isUser = false 
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

  // localCartToRemoteCart(){
  //   let data= localStorage.getItem('localCartData');
  //   if(data) {
  //     let cartDataList: Product[] = JSON.parse(data);
  //     let user = localStorage.getItem('user');
  //     let userId = user && JSON.parse(user).id

  //     cartDataList.forEach((product: Product, index) => {
  //       let cartData: Cart= {
  //         ...product,
  //         productId: product.id,
  //         userId
  //       };

  //       delete cartData.id;
  //       console.log(cartData);
  //       this.userService.addToCart(cartData).subscribe((result) => {
  //         if(result){
  //           console.log("item stored in the database successfully");
  //         }
  //       })
  //       if(cartDataList.length === index+1){
  //         console.log("in here if ")
  //         localStorage.removeItem('localCartData');
  //       }
  //     })
  //   }
  // }
}
