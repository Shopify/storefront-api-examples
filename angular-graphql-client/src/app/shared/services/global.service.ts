import { Injectable } from '@angular/core';
import { Cart, LineItem } from './../../shared/models';
import { BehaviorSubject } from "rxjs";

@Injectable()

export class GlobalService {

    cartObs: BehaviorSubject<Cart> = new BehaviorSubject(new Cart);
    lineItemsObs: BehaviorSubject<LineItem[]> = new BehaviorSubject([]);
    newlineItemObs: BehaviorSubject<LineItem> = new BehaviorSubject(null);
    cartOpenCloseObs: BehaviorSubject<boolean> = new BehaviorSubject(true);

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

    get cartOpenClose(){
        return this.cartOpenCloseObs.getValue();
    }

    set cartOpenClose(value: boolean){
        this.cartOpenCloseObs.next(value);
    }

    addItemToCart(lineItem: LineItem) {

        let lineItems = this.lineItemsObs.getValue();
        let sameVariant = lineItems.filter(item => item.variant == lineItem.variant);
        if (sameVariant.length) {
            sameVariant[0].quantity = sameVariant[0].quantity + lineItem.quantity;
            this.lineItemsObs.next(lineItems);
        } else {
            this.newlineItemObs.next(lineItem);
        }
    }


    removeItem(lineItem) {

        let lineItems = this.lineItemsObs.getValue();
        let index = lineItems.indexOf(lineItem);

        if (index!=-1) {
            lineItems.splice(index, 1)
            this.lineItemsObs.next(lineItems);
        }
    }
}


