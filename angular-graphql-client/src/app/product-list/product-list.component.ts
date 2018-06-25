import { Component, OnInit } from '@angular/core';
import { ShopifyService, Product } from './../shared';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent {

  products: Array<Product>;

  constructor(
    private shopifyService: ShopifyService
  ) {
    this.shopifyService.getProducts().then((products) => {
      this.products = products
    }, err=> alert(err));
  }

}
