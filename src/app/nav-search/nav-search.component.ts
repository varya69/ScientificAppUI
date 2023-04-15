import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-types';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit {
  sellername: string= ''
  username: string= ''
  menuType : String = 'default';
  // searchTerm: string = '';
  searchResults?: Product[];
  showResults: boolean | undefined;
  cartItems = 0

  constructor(private router: Router, private http: HttpClient, private changeDetectorRef: ChangeDetectorRef,
    private userService : UserService) { }

  ngOnInit(): void {
    //this is for updating the header after user signup send it to the home page if user tring to go login signup page
    this.router.events.subscribe((res: any) => {
      // console.log(res.url)
      if(res.url){
        // console.log("response router :", res.url);
        if (localStorage.getItem('seller') && res.url.includes('seller')){ // if the user routes to the seller account then 
          this.menuType = 'seller';

          if(localStorage.getItem('seller')){ //for fetching the name of the seller account
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)
            // console.log(sellerData.SellerName);
            this.sellername = sellerData.SellerName     //check if the seller store is not empty and if it has some data then fetch the data
"          }"
          }
        } else if (localStorage.getItem('user') && res.url.includes('/')){ // if the user routes to the seller account then 
          // console.log("In user");
          this.menuType = 'user';

          if(localStorage.getItem('user')){ //for fetching the name of the user account
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore)
            this.userService.getCartList(userData.UserId)
            console.log(userData.UserId);
            this.username = userData.UserName     //check if the user store is not empty and if it has some data then fetch the data

          "}"

          }
        } else{
          // console.log("In default");
          this.menuType = 'default'; 
        }
      }
    })

    // for displaying the number of cart items to the header
    let cartData = localStorage.getItem('localCartData');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }

    this.userService.cartData.subscribe((items) => {    // this functionality is for update the cart data when user click on add to cart 
      this.cartItems = items.length;
    })
  }

  logout(){
    localStorage.removeItem('seller')
    localStorage.removeItem('user')
    this.router.navigate(['/selling-auth']);
    this.userService.cartData.emit([])
    location.reload();
  }

  search(query: KeyboardEvent) {
    // console.log(this.searchTerm);
    if (query.key === 'Backspace') { // backspace key
      // hide the results container if the search input is empty
      this.showResults = (query.target as HTMLInputElement).value !== '';
    }
    if (query){
      let searchTerm = query.target as HTMLInputElement

      this.http.get('http://localhost:8000/products/?search=' + searchTerm.value).subscribe((data: any) => {
        // console.log(data);
        
        this.searchResults = data.results;
        this.changeDetectorRef.detectChanges(); // Trigger change detection

      });
    }
  }

  hideSearch(){
    this.searchResults = undefined;
  }

  submitSearch(value: string){
    this.router.navigate([`search/${value}`]); 
    // this.router.navigate([`search/${value}`], { queryParams: { q: value } });
  }

  redirectToDetails(id: number){
    this.router.navigate([`/details/${id}`]); 
    // location.reload();
    }
}
