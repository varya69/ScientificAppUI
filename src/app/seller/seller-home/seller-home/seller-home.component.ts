import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/data-types';
import { SellerService } from 'src/app/services/seller.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import { UpdateProductComponent } from '../../update-product/update-product.component';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {

  productList: undefined | Product[]
  constructor(private http: HttpClient, private sellerService: SellerService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshList();
  }

  deleteModal(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Confirm Delete',
        message: 'Are you sure you want to delete this product?'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.deleteProduct(id);
      }
    });
  }


  deleteProduct(id: number): void { 
    this.sellerService.deleteProduct(id).subscribe((res: any)=>{
      if (res) {
        alert(res['message']);
        this.refreshList();
      } else {
        alert('Failed to delete product');
      }
    },
    error => {
      console.log('Error:', error);
    })
  }

  openUpdateProductDialog(productId: number) {
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      width: '800px',
      height: '700px',
      data: { productId: productId }
    });

    dialogRef.afterClosed().subscribe(result => {
      /* handle the dialog result */
    });
  }

  refreshList(){
    let data = localStorage.getItem('seller')
    let productData = data && JSON.parse(data);
    let sellerId = productData.SellerId;

    this.sellerService.productList(sellerId).subscribe((res)=> {
      console.log(res)
      this.productList = res
    })
  }

}
