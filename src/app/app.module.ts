import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavSearchComponent } from './nav-search/nav-search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { SellingAuthComponent } from './selling-auth/selling-auth.component';
import { FormsModule } from '@angular/forms';
import { SellerHomeComponent } from './seller/seller-home/seller-home/seller-home.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SellerAddProductComponent } from './seller/seller-add-product/seller-add-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './seller/confirm-dialog/confirm-dialog.component';
import { UpdateProductComponent } from './seller/update-product/update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
@NgModule({
  declarations: [
    AppComponent,
    NavSearchComponent,
    HomeComponent,
    SellingAuthComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    ConfirmDialogComponent,
    UpdateProductComponent,
    SearchComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatTooltipModule,
    NgbModule ,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
