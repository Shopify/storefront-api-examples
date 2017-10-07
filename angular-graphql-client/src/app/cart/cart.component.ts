import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ShopifyService, GlobalService, LineItem, MailingAddress, Cart, CheckoutStatus } from './../shared';
import { addressSample } from './cart-data-model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  cartForm: FormGroup;
  checkoutButtonTitle: string = 'Create checkout';
  checkoutFromShopify: string;

  constructor(
    private fb: FormBuilder,
    private shopifyService: ShopifyService,
    private globalService: GlobalService,
  ) {
    this.createForm();
  }

  ngOnInit() {

    const glCart = this.globalService.cart;

    this.cartForm.reset({
      id: glCart.id,
      email: glCart.email,
      allowPartialAddresses: glCart.allowPartialAddresses,
      status: glCart.status
    });

    this.setAddress(glCart.shippingAddress);
    this.setLineItems(this.globalService.lineItems);

    if (glCart.status == CheckoutStatus.update){
      this.checkoutButtonTitle = "Update checkout"
    }

  }

  ngOnDestroy() {
    this.globalService.cart = this.cartForm.value;
    this.globalService.lineItems = this.lineItems.value;
  }

  get cartId(): string {
    return this.cartForm.get('id').value;
  }

  setLineItems(lineItems: LineItem[]) {

    const lineItemFGs = lineItems.map(lineItem => this.fb.group(lineItem));

    const lineItemFormArray = this.fb.array(lineItemFGs);

    this.cartForm.setControl('lineItems', lineItemFormArray);

  }

  get lineItems(): FormArray {
    return this.cartForm.get('lineItems') as FormArray;
  };

  createForm() {
    this.cartForm = this.fb.group({
      id: ['',],
      email: ['',],
      shippingAddress: this.fb.group(
        new MailingAddress()
      ),
      allowPartialAddresses: false,
      lineItems: this.fb.array([]),
      lineItemsGl: this.fb.array([]),
      status,
    });
  }


  setAddress(address: MailingAddress) {
    this.cartForm.setControl('shippingAddress', this.fb.group(address));
  }

  createUpdateCheckout() {

   const glCart = this.globalService.cart;

    if (glCart.status == CheckoutStatus.update) {
      let ItemsForAdd = [], ItemsForUpdate = [];
      this.lineItems.value.forEach(element => {
        if (!element.id) {
          ItemsForAdd.push(element);
        } else {
          ItemsForUpdate.push(element);
        }
      });

      if (ItemsForAdd.length) {
        this.shopifyService.addVariantsToCheckout(this.cartId, ItemsForAdd.map(function (lineItem) {
          return {
            'variantId': lineItem.variant.id,
            'quantity': +lineItem.quantity
          }
        })).then(({ model, data }) => {

          if (!data.checkoutLineItemsAdd.userErrors.length) {

            let lineItems = this.globalService.lineItems;

            for (let i = 0; i < this.lineItems.length; i++) {
              let id = data.checkoutLineItemsAdd.checkout.lineItems.edges[i].node.id;
              this.lineItems.at(i).get('id').setValue(id);
              lineItems[i].id = id;
            }
          }

          this.checkoutButtonTitle = "Update checkout";
          this.cartForm.get('status').setValue(CheckoutStatus.update);
        });
      }
      if (ItemsForUpdate.length) {
        this.shopifyService.updateCheckout(this.cartId, ItemsForUpdate.map(function (lineItem) {
          return {
            'id': lineItem.id,
            'quantity': +lineItem.quantity
          }
        }));
      }

    } else {

      this.createCheckout()

    }
  }

  createCheckout() {

    this.shopifyService.createCheckout(
      this.lineItems.value.map(function (lineItem) {
          return {
            'variantId': lineItem.variant.id,
            'quantity': +lineItem.quantity
          }
        }),
      this.cartForm.get('allowPartialAddresses').value,
      this.cartForm.get('shippingAddress').value).then(({ model, data }) => {
        if (!data.checkoutCreate.userErrors.length) {

          this.cartForm.get('id').setValue(
            data.checkoutCreate.checkout.id
          )

          if (data.checkoutCreate.checkout.lineItems.length != 0) {

            let lineItems = this.globalService.lineItems;

            for (let i = 0; i < this.lineItems.length; i++) {
              let id = data.checkoutCreate.checkout.lineItems.edges[i].node.id;
              this.lineItems.at(i).get('id').setValue(id);
              lineItems[i].id = id;
            }
          }
          this.checkoutButtonTitle = "Update checkout";
          this.cartForm.get('status').setValue(CheckoutStatus.update);
        }
      }
      )
  }

  fetchCheckout() {
    this.shopifyService.fetchCheckout(this.cartId).then(
      (checkout) => this.checkoutFromShopify = 'id: ' + checkout.id + ';' +
        'lineItems: ' + checkout.lineItems.map(lineItem => lineItem.variant.title + ' ' + lineItem.quantity));
  }

  removeItem(i) {

    const lineItemId = this.lineItems.at(i).get('id').value;

    let errorsLength = 0;

    if (this.cartId) {
      this.shopifyService.removeLineItem(this.cartId, lineItemId).then(({ model, data }) => {
        errorsLength = data.checkoutLineItemsRemove.userErrors.length;
      });
    }

    if (!errorsLength) {
      this.lineItems.removeAt(i);
      this.globalService.removeItemFromCart(i);
    }
  }

}