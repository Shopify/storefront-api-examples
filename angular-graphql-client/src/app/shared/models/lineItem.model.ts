import { Variant } from './variant.model';
import { StaticReflector } from '@angular/compiler';

export class LineItem{

    /*id: string = '';
    title: string = '';
    quantity: number = 0;
    variant: Variant = new Variant;
    imageSrc: string;
    price: number;

    constructor(title, variant, price, imageSrc, quantity) {
        this.title = title;
        this.variant = variant;
        this.price = price;
        this.imageSrc = imageSrc;
        this.quantity = quantity;
    }*/
        variant: Variant;
        quantity: number;
        // id?: string;
        variantId: string;//for shopify API
        id: string;

        constructor(variant: Variant, quantity: number) {
            this.variant = variant;
            this.quantity = quantity;
            this.variantId = variant.id;

        }

}