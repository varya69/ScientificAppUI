import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { logIn, Product, SignUp, Cart } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  cartData = new EventEmitter<Product[] | []>(); // this is used for when user clicked on add to cart the cart items in heder should get updated thats why
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
        this.localCartToRemoteCart()
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

  localAddToCart(data: Product){
    console.log("in here localAddToCart");
    
    let cartData = [];
    let localCartData = localStorage.getItem('localCartData'); // this is needed if there is already data in localstorage
    if(!localCartData){
      localStorage.setItem('localCartData', JSON.stringify([data]));
      this.cartData.emit([data])
    } else {
      cartData = JSON.parse(localCartData);
      cartData.push(data)
      localStorage.setItem('localCartData', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData) // update the cart item number in the header 
  }
  
  removeItemFromCart(productId: number){
    let cartData = localStorage.getItem('localCartData');
    if (cartData) {
      let items:Product[] = JSON.parse(cartData);
      items = items.filter( (item: Product) => productId !== item.id)
      
      // Replacing the cart data in the local storage with current items 
      localStorage.setItem('localCartData', JSON.stringify(items));
      this.cartData.emit(items) // update the cart item number in the header 
    }
  }

  addToCart(cartData: Cart){
    return this.http.post(`${this.apiUrl}cart/`, cartData )
  }

  localCartToRemoteCart(){
    let data= localStorage.getItem('localCartData');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).UserId
    if(data) {
      let cartDataList: Product[] = JSON.parse(data);
      cartDataList.forEach((product: Product, index) => {
        let cartData: Cart= {
          ...product,
          productId: product.id,
          userId
        };

        delete cartData.id;
        // console.log(cartData);
        this.http.post(`${this.apiUrl}cart/`, cartData).subscribe((result) => {
          if(result){
            console.log("item stored in the database successfully");
          }
        })
        if(cartDataList.length === index+1){
          localStorage.removeItem('localCartData');
        }
      })
    }

    this.getCartList(userId)
  }

  getCartList(userId: number){
    this.http.get<Product[]>(`${this.apiUrl}get_cart/${userId}`, {observe:'response'}).subscribe((res) => {
      if(res && res.body){
        this.cartData.emit(res.body);
      }
      
    })
  }

  removeFromCart(cartId: number) {
    return this.http.delete(`${this.apiUrl}delete-cart/${cartId}`)
  }
}
