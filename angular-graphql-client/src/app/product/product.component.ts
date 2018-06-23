import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product, Variant, ShopifyService, LineItem, GlobalService } from './../shared';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/observable/fromPromise';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {

  @Input()
  productInput: Product;

  product: Product;

  form = new FormGroup({
    variant: new FormControl([]),
    quantity: new FormControl(1),
  });

  constructor(

    private shopifyService: ShopifyService,
    private globalService: GlobalService,
  ) { }

  ngOnInit() {
    this.shopifyService.getProductById(this.productInput.id).then((product) => {
      this.product = product;
      this.form.get("variant").setValue(this.product.variants[0]);
    }).catch(err => alert(err));
  }

  addToCart(lineItem: LineItem) {
    this.globalService.addItemToCart(lineItem);
  }

  onSubmit() {
    const lineItem = new LineItem(this.form.value.variant, this.form.value.quantity);
    this.addToCart(lineItem);
  }

}
