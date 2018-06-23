import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { RouterModule } from '@angular/router';

import {
  ShopifyService,
  ProductService,
  GlobalService
} from './shared';

import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';

const rootRouting: ModuleWithProviders = RouterModule.forRoot([
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  //{ path: '**', component: PageNotFoundComponent }
], { /*enableTracing: true */});

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductListComponent,
    CartComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    // ProductModule,
    // rootRouting
    /*,
    SharedModule*/
  ],
  providers: [ShopifyService, ProductService, GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
