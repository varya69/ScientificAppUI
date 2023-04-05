import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/data-types';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  productData : undefined | Product
  url = ''
  constructor(
    public dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number }, private sellerService: SellerService
    ) { }
    
    ngOnInit(): void {
    let productId = this.data.productId;
    productId && this.sellerService.getproduct(productId).subscribe((data: Product)=>{

      this.productData = data;
    })
    console.log(productId);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(data: Product): void {
    if(this.productData){
      data.id = this.productData.id;
    }
    this.sellerService.updateProduct(data).subscribe((response: any) => {
      if(response){
        alert(response['message']);
      }else {
        alert('Failed to Update product');
      }
    })
  }
}
