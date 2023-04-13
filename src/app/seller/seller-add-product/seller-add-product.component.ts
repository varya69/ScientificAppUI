import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/data-types';
import { SellerService } from 'src/app/services/seller.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit {
  
  selectedFile: File | null = null;
  url = 'https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg'
  form: any = {};

  constructor(private http: HttpClient, private sellerService: SellerService, private router: Router) {}

  ngOnInit(): void {
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
    this.selectedFile = event.target.files[0];
    // console.log(this.selectedFile);
  }

  
  onSubmit(form: NgForm) {

    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    let data = localStorage.getItem('seller')
    let productData = data && JSON.parse(data);
    let sellerId = productData.SellerId;

    formData.append('ProductName', form.value.ProductName);
    formData.append('Description', form.value.Description);
    formData.append('Category', form.value.Category);
    formData.append('Price', form.value.Price);
    formData.append('image', this.selectedFile, this.selectedFile.name);
    // console.log(formData);
    this.http.post(`http://localhost:8000/add-product/${sellerId}`, formData).subscribe((response: any) => {
      if (response['success']) {
        alert(response['message']);
        this.router.navigate(['/seller-home']);
      } else {
        alert('Failed to add product, Please add all the sections...');
      }
    },
    error => {
      console.log('Error:', error);
    }

    // if (response.success) {
      //     this.responseMessage = '<div class="alert alert-success">Product added successfully.</div>';
      //   } else {
      //     this.responseMessage = '<div class="alert alert-danger">' + response.message + '</div>';
      //   }
      // },
      // error => {
      //   this.responseMessage = '<div class="alert alert-danger">An error occurred while adding the product.</div>';
      // }
  );
  }
}





