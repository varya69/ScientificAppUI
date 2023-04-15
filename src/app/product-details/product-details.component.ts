import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart, Product } from '../data-types';
import { SellerService } from '../services/seller.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productData?: Product
  productQuantity: number= 1
  addToCart: boolean = false;
  removeCart: boolean = false;
  removeCartData?: Product
  constructor(private activateRoute: ActivatedRoute, private sellerService: SellerService, private userService : UserService) { }

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    productId && this.sellerService.getproduct(Number(productId)).subscribe((product) => {
      this.productData = product;
    
      let cartData = localStorage.getItem('localCartData');
      if(productId && cartData){
        let items = JSON.parse(cartData);
      items = items.filter((item: Product) => productId === item.id.toString())
      if(items.length > 0){
        this.addToCart = true
      } else {
        this.addToCart = false
      }
    }
    
    // this is for to display the items in the cart when user login 
    let user = localStorage.getItem('user');
    if(user){
      
      let userId = user && JSON.parse(user).UserId
      this.userService.getCartList(userId)
      this.userService.cartData.subscribe((res) => {
        let item = res.filter((item : Product) => productId?.toString() === item.productId?.toString())
        if(item.length){
          this.removeCartData = item[0]
          this.addToCart = true
        }
      })
    }
    })
  }

  handleQuantity( val : string){
    if (this.productQuantity < 20 && val==='plus'){
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val==='min'){
      this.productQuantity -= 1;
    }
  }

  goToCart() {
    this.addToCart = false
  }
  
  removeToCart(productId: number) {
    if(!localStorage.getItem('user')){
      this.userService.removeItemFromCart(productId)
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).UserId
      console.log('Removing element from cart', this.removeCartData)
      this.removeCartData && this.userService.removeFromCart(this.removeCartData.id).subscribe((response : any) => {
        if(response){
          console.log(response)
          this.userService.getCartList(userId)
          alert(response.message)
        } else {
          alert(response.error)
        }
      })
    }
    this.addToCart = false
  }

  AddToCart(){
    this.addToCart = true;
    if(this.productData){
      this.productData.quantity = this.productQuantity 
      if(!localStorage.getItem('user')){
        this.userService.localAddToCart(this.productData)
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).UserId
        console.log(userId)
        let cartData:Cart = {
          ...this.productData,
          userId: userId,
          productId: this.productData.id, // taking the product id into variable productid for not getting confution between cart id and product id 
        }
        delete cartData.id;   // delete the id from cart for not getting collision between cart id and product id 
        this.userService.addToCart(cartData).subscribe((data) => {
          if (data) {
            this.userService.getCartList(userId)
            this.addToCart = true
            alert("product is added to cart")
          }
        })
      }
    }
  }

}
