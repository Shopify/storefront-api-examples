import { Injectable } from '@angular/core';
import { Cart, Variant, LineItem } from './../../shared';

import { BehaviorSubject } from "rxjs";

@Injectable()

export class GlobalService {

    cartObs: BehaviorSubject<Cart> = new BehaviorSubject(new Cart);
    lineItemsObs: BehaviorSubject<LineItem[]> = new BehaviorSubject([]);

    constructor() {
        let cart = new Cart;
        this.cartObs.next(cart);
    }


    get cart() {
        return this.cartObs.getValue();
    }

    set cart(cart) {
        this.cartObs.next(cart);
    }

    set lineItems(lineItems) {
        this.lineItemsObs.next(lineItems);
    }

    get lineItems() {
        return this.lineItemsObs.getValue();
    }

    addItemToCart(variant: Variant) {
        let quant = prompt("You want to add " + variant.title + " to the cart. Please, enter quantity", '1')
        this.lineItems.push(
            {
                id: '',
                title: variant.title,
                quantity: +quant,
                variant: variant,
            }
        );
        this.lineItems = this.lineItems;
    }

    removeItemFromCart(i) {     
        this.lineItems.splice(i, 1);
    }
}
