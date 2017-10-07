import { Component, OnInit } from '@angular/core';
import { ShopifyService, Product } from './../shared';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Array<Product>;

  constructor(
    private shopifyService: ShopifyService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.shopifyService.getProducts().then((products) =>{
       this.products = products 
      });
  }

  onSelect(product: Product){
    this.router.navigate(['/product', product.id]);
    
  }

}
