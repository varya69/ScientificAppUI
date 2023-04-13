import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { logIn, Product, SignUp } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  // authError = ''
  isSellerLoggedIn = new BehaviorSubject<boolean>(false)
  isLogginError = new EventEmitter<Boolean>(false)
  private apiUrl = 'http://localhost:8000/'; // replace with your API URL

  constructor(private http: HttpClient, private router: Router) { }

  signUp(data: SignUp) {
    return this.http.post(`${this.apiUrl}seller/`, data, { observe: 'response' }).subscribe((result) => {     //Suscribing here for the authentication and in post request taking the observable 
      console.log(result)
      this.isSellerLoggedIn.next(true)            // changing the value of the auth guard is true 
      localStorage.setItem('seller', JSON.stringify(result.body))     //store the seller data in localstorage cause after refresh data cannot be vanished 
      this.router.navigate(['seller-home'])
    })
    // console.log(data);
  }

  sellerLogin(data: logIn){
    return this.http.post(`${this.apiUrl}seller-login/`, data , { observe: 'response' }).subscribe((res:any) => {
      // localStorage.setItem('token', res.token);
      console.log( res.body);
      if (res.status === 200 && res.body.message === 'Login successful'){
        localStorage.setItem('seller', JSON.stringify(res.body))     //store the seller data in localstorage cause after refresh data cannot be vanished 
        this.router.navigate(['seller-home']) // Redirect the user to the dashboard or some other page
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

  relaodSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true)            // changing the value of the auth guard is true 
      this.router.navigate(['seller-home'])
    }
  }
  
  productList(sellerId : number): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${localStorage.getItem('seller')}` // Assuming you're using JWT for authentication
    // });
    
    return this.http.get(`${this.apiUrl}product-list/${sellerId}`);
  }


  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}products/${id}`)
  }

  getproduct(id: number) {
    return this.http.get<Product>(`${this.apiUrl}product/${id}`)
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`${this.apiUrl}update_product/${product.id}`, product)
  }

  // updateProduct(product: Product): Observable<Product> {
  //   const url = `${this.apiUrl}/${product.id}`; // Replace with your API endpoint for updating a product
    
  //   // Create a FormData object to send the updated product data, including the image file
  //   const formData = new FormData();
  //   formData.append('name', product.ProductName);
  //   formData.append('price', product.Price.toString());
  //   formData.append('description', product.Description);
  //   formData.append('image', product.image);

  //   return this.http.put<Product>(url, formData);
  // }

  // updateProduct(id: number, formData: FormData): Observable<any> {

  //   return this.http.put(`${this.apiUrl}update_product/${id}`, formData);
  // }
  
  allProducts(){
    return this.http.get<Product[]>(`${this.apiUrl}all-products/`)
  }
}
