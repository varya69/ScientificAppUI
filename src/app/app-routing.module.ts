import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { NavSearchComponent } from './nav-search/nav-search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller/seller-add-product/seller-add-product.component';
import { SellerHomeComponent } from './seller/seller-home/seller-home/seller-home.component';
import { UpdateProductComponent } from './seller/update-product/update-product.component';
import { SellingAuthComponent } from './selling-auth/selling-auth.component';
import { CartDetailsPageComponent } from './cart-details-page/cart-details-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent 
  },
  { 
    path: 'seller-auth', 
    component: SellingAuthComponent 
  },
  { 
    path: 'seller-home',
    component: SellerHomeComponent, 
    canActivate: [AuthGuard]
  },

  { 
    path: 'seller-add-product',
    component: SellerAddProductComponent, 
    canActivate: [AuthGuard]
  },

  { 
    path: 'search/:query',
    component: SearchComponent, 
  },

  { 
    path: 'details/:productId',
    component: ProductDetailsComponent, 
  },

  { 
    path: 'cart_page_details',
    component: CartDetailsPageComponent, 
  },

  // { 
  //   path: 'update-product/:id',
  //   component: UpdateProductComponent, 
  //   canActivate: [AuthGuard]
  // },
  // { path: 'contact', component: ContactComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
