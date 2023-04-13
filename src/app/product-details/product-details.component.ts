import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-types';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productData?: Product
  productQuantity: number= 1

  constructor(private activateRoute: ActivatedRoute, private sellerService: SellerService) { }

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    productId && this.sellerService.getproduct(Number(productId)).subscribe((product) => {
      this.productData = product;
    })
  }

  handleQuantity( val : string){
    if (this.productQuantity < 20 && val==='plus'){
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val==='min'){
      this.productQuantity -= 1;
    }
  }

}
