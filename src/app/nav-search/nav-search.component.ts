import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../data-types';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit {
  sellername: string= ''
  menuType : String = 'default';
  // searchTerm: string = '';
  searchResults?: Product[];
  showResults: boolean | undefined;

  constructor(private router: Router, private http: HttpClient, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.router.events.subscribe((res: any) => {
      if(res.url){
        // console.log("response router :", res.url);
        if (localStorage.getItem('seller') && res.url.includes('seller')){ // if the user routes to the seller account then 
          // console.log("In seller");
          this.menuType = 'seller';

          if(localStorage.getItem('seller')){ //for fetching the name of the seller account
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)
            // console.log(sellerData.SellerName);
            this.sellername = sellerData.SellerName     //check if the seller store is not empty and if it has some data then fetch the data
"          }"
          }
        } else{
          // console.log("In default");
          this.menuType = 'default'; 
        }
      }
    })
  }

  logout(){
    localStorage.removeItem('seller')
    this.router.navigate(['/']);
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
        console.log(data);
        
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

}
