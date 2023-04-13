import { HttpClient } from '@angular/common/http';
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

  selectedFile: File | undefined ; // for storing the selected file
  productData : undefined | Product
  url = ''
  constructor(
    public dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number }, private sellerService: SellerService,
    private http : HttpClient
) { }
    
    ngOnInit(): void {
    let productId = this.data.productId;
    productId && this.sellerService.getproduct(productId).subscribe((data: Product)=>{
      this.productData = data;
      console.log(this.productData);
      this.selectedFile = this.productData.image
    })
    console.log(productId);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) =>{
        // console.log(this.url);
        this.url = e.target.result
        // console.log(this.url);
        // reader.readAsDataURL(this.selectedFile);
      }
    }
    this.selectedFile = event.target.files[0]; // get the selected file
  }

  onSubmit(data: Product): void {
    console.log(data);
  
    if (this.productData) {
      data.id = this.productData.id;
    }
  
    // Append imageFormData to the form data object
    // const formData = new FormData();

    // // Append other form data fields
    // formData.append('ProductName', data.ProductName);
    // formData.append('Description', data.Description);
    // formData.append('Category', data.Category);
    // formData.append('Price', data.Price.toString());
    
    // // Append the image file to the FormData object
    // if(this.selectedFile)
    // formData.append('image', this.selectedFile, this.selectedFile.name);
    // console.log(data.image);

    this.sellerService.updateProduct(data).subscribe(
      (response: any) => {
        if (response) {
          alert(response['message']);
        } else {
          alert('Failed to Update product');
        }
      }
    );
  }
}
