import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Cart, priceSummary } from '../data-types';

@Component({
  selector: 'app-cart-details-page',
  templateUrl: './cart-details-page.component.html',
  styleUrls: ['./cart-details-page.component.scss']
})
export class CartDetailsPageComponent implements OnInit {

  cartData ?: Cart[];
  priceSummary: priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0,
}

  constructor(private userService : UserService, ) { }

  ngOnInit(): void {
    this.userService.currentCart().subscribe((res) => {
      this.cartData = res;
      let price = 0
      res.forEach((item) => {
        if (item.quantity){
          price = price + (+ item.Price * + item.quantity)
        }
      })

      this.priceSummary.price = price
      this.priceSummary.discount = price/10
      this.priceSummary.tax = price/10
      this.priceSummary.delivery = 100

      this.priceSummary.total = price + (price/10) + 100 - (price/10)
      console.log(this.priceSummary)
    })  
  }

}
