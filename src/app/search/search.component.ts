import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef , Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../data-types';
import { SellerService } from '../services/seller.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResults?: Product[];
  notFound = 'default';

  constructor(private activeRoute: ActivatedRoute, private sellerService: SellerService, 
    private http: HttpClient, private router: Router, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {  // this is used to update the route means page
    let query = this.activeRoute.snapshot.paramMap.get('query'); // we used query because in routing file we used to pass the keywoed as a query
    // let query = this.activeRoute.snapshot.queryParamMap.get('q');
    if(query){

      this.http.get('http://localhost:8000/products/?search=' + query).subscribe((data: any) => {
        console.log(data.results.length);
        if(data.results.length>0){
          this.searchResults = data.results;
          this.notFound='search'
          this.changeDetectorRef.detectChanges()          
        } else {
          // this.searchResults = ''
          this.notFound='default'
        }
      });
    }
  });
  }


}
