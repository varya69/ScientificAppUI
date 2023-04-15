import { Component, OnInit } from '@angular/core';
import { Product } from '../data-types';
import { SellerService } from '../services/seller.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productList ?: Product[] 
  constructor(private sellerService: SellerService, private userService: UserService,
    private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sellerService.allProducts().subscribe((products) => {
      this.productList = products

    })

    
    // this is for to display the items in the cart when user login 
    // let productId = this.activateRoute.snapshot.paramMap.get('productId');
    // let user = localStorage.getItem('user');
    // if(user){
      
    //   let userId = user && JSON.parse(user).UserId
    //   this.userService.getCartList(userId)
    //   this.userService.cartData.subscribe((res) => {
    //     let item = res.filter((item : Product) => productId?.toString() === item.productId?.toString())
    //     // if(item.length){
    //     //   this.addToCart = true
    //     // }
    //   })
    // }
  }


}
