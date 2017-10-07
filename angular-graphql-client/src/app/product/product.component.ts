import { Component, OnInit } from '@angular/core';
import { Product, Variant, ShopifyService, GlobalService } from './../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { Image } from './../shared';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private product: Product;

  constructor(
    private shopifyService: ShopifyService,
    private globalService: GlobalService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.route.data.subscribe(
      (data: { product: any }) => {
        this.product = data.product;

      })
    if (this.product.images.length == 0) {
      let im = new Image();
      im.src = './assets/images/empty-img.png';
      this.product.images.push(new Image());
    }

    /*this.product.variants.forEach(element => {
      if (!element.image) {
        let im = new Image();
        im.src = './assets/images/empty-img.png';
        element.image = im;
        console.log(element.image);
      }

    });*/

  }

  addToCart(variant: Variant) {
    this.globalService.addItemToCart(variant);

  }

}
