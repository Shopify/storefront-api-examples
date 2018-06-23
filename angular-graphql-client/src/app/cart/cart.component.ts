import { Component, OnInit } from '@angular/core';
import { ShopifyService, LineItem, GlobalService } from './../shared';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  lineItems: LineItem[];
  cartId: string;
  cartOpen: boolean;


  constructor(
    private shopifyService: ShopifyService,
    private globalService: GlobalService,
  ) {

  }

  ngOnInit() {
    this.globalService.lineItemsObs.subscribe(lineItems => {
      if (this.cartId) {
        this.updateItemQuantity().then(
          quantityUpdated => { if (quantityUpdated) { this.lineItems = lineItems } }, err => alert(err)
        )
      } else {
        this.lineItems = lineItems;
      }
    }
    )
    this.globalService.newlineItemObs.subscribe(lineItem => {
      if (lineItem) {
        this.addItem(lineItem);
      }
    }
    )
    this.globalService.cartOpenCloseObs.subscribe(cartOpenClose =>
      this.cartOpen = cartOpenClose
    )
  }

  createUpdateCheckout() {
    if (!this.cartId) {
      this.shopifyService.createCheckout(this.lineItems).then(
        ({ model, data }) => {
          if (!data.checkoutCreate.userErrors.length) {
            this.cartId = data.checkoutCreate.checkout.id;
            this.openCheckout(data.checkoutCreate.checkout);
            let i = 0;
            data.checkoutCreate.checkout.lineItems.edges.forEach(edge => {
              this.lineItems[i].id = edge.node.id;
              i++;
            });
          } else {
            data.checkoutCreate.userErrors.forEach(error => {
              alert(JSON.stringify(error));
            });
          }
        }, err => alert(err)
      );
    } else {
      this.shopifyService.fetchCheckout(this.cartId).then(
        ({ model, data }) => {
          this.openCheckout(data.checkout);
        }, err => alert(err)
      )
    }
  }

  addItem(lineItem: LineItem) {
    if (this.cartId) {
      this.shopifyService.addVariantsToCheckout(this.cartId, [lineItem]).then(
        ({ model, data }) => {
          if (!data.checkoutLineItemsAdd.userErrors.length) {
            this.lineItems.push(lineItem);
            let i = 0;
            data.checkoutLineItemsAdd.checkout.lineItems.edges.forEach(edge => {
              if (edge.node.variant.id = lineItem.variantId) {
                this.lineItems[i].id = edge.node.id;
              }
              i++;
            });
          } else {
            data.checkoutLineItemsAdd.userErrors.forEach(error => {
              alert(JSON.stringify(error));
            });
          }
        }, err => alert(err)
      )
    } else {
      this.lineItems.push(lineItem)
    }
  }

  removeItem(lineItem: LineItem) {
    if (this.cartId) {
      this.shopifyService.removeLineItem(this.cartId, lineItem.id).then(
        ({ model, data }) => {
          if (!data.checkoutLineItemsRemove.userErrors.length) {
            this.globalService.removeItem(lineItem);
          } else {
            data.checkoutLineItemsRemove.userErrors.forEach(error => {
              alert(JSON.stringify(error));
            });
          }
        }, err => alert(err)
      )
    } else {
      this.globalService.removeItem(lineItem);
    }
  }

  increaseQuantity(lineItem: LineItem) {
    lineItem.quantity++;
    if (this.cartId) {
      this.updateItemQuantity().then(
        quantityUpdated => {
          if (!quantityUpdated) {
            lineItem.quantity--;
          }
        }, err => alert(err)
      )
    }
  }

  decreaseQuantity(lineItem: LineItem) {
    if (lineItem.quantity > 1)
      lineItem.quantity--;
    if (this.cartId) {
      this.updateItemQuantity().then(
        quantityUpdated => {
          if (!quantityUpdated) {
            lineItem.quantity++;
          }
        }, err => alert(err)
      )
    }
  }

  updateItemQuantity(): Promise<boolean> {
    return this.shopifyService.updateLineItem(this.cartId, this.lineItems).then(
      ({ model, data }) => {
        if (!data.checkoutLineItemsUpdate.userErrors.length) {
          return true;
        } else {
          data.checkoutLineItemsUpdate.userErrors.forEach(error => {
            alert(JSON.stringify(error));
          });
          return false;
        }
      }, err => false
    )
  }

  get total(): number {
    if (this.lineItems.length) return this.lineItems.map(lineItem => lineItem.quantity * (+lineItem.variant.price)).reduce((prev, next) => prev + next);
    else return 0;
  }

  openCheckout(checkout) {
    window.open(checkout.webUrl);
  }

  closeCart() {
    this.globalService.cartOpenClose = !this.globalService.cartOpenClose
    this.cartOpen = this.globalService.cartOpenClose;
  }

}

