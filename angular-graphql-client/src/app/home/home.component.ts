import { Component, OnInit } from '@angular/core';
import { GlobalService, ShopifyService } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  openCart: boolean = true;
  shopTitle: string;

  constructor(private globalService: GlobalService,
    private shopifyService: ShopifyService) {
  }

  ngOnInit() {
    this.shopifyService.getCurrentShop().then(
      ({model, data}) => this.shopTitle = data.shop.name, err=> alert(err))
  }

  openCloseCart() {
    this.globalService.cartOpenClose = !this.globalService.cartOpenClose
  }

}
