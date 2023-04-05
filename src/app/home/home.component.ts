import { Component, OnInit } from '@angular/core';
import { Product } from '../data-types';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productList ?: Product[] 
  constructor(private sellerService: SellerService) { }

  ngOnInit(): void {
    this.sellerService.allProducts().subscribe((products) => {
      this.productList = products
    })
  
  }


}
