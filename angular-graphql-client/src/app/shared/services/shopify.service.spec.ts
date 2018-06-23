import { TestBed, inject, async } from '@angular/core/testing';

import { ShopifyService } from './shopify.service';
import { HttpModule, RequestOptions } from "@angular/http";
import { Product } from "../models";
// import {MyRequestOptions} from "../../app.module";


describe('ShopifyService', () => {
    // const productId = 1648;
    const quantity = 2;
    const newQuantity = 4;
    const product: Product = {
        id: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0Lzk3ODc4NzA3Mjk=',
        title: 'Balanced De-engineered Practical Frozen Ball',
        createdAt: new Date(1520153919723),
        description: 'Great product',
        descriptionPlainSummary: '',
        handle: '',
        productType: '',
        publishedAt: new Date(1520153919723),
        tags: 'pineapple',
        updatedAt: new Date(1520153919723),
        variants: [],
        vendor: '',
        images: []
    };

    let service;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                ShopifyService,
                // { provide: RequestOptions, useClass: MyRequestOptions },
            ],
            imports: [HttpModule]
        });
        // jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    }));

    beforeEach(inject([ShopifyService], s => {
        service = s;
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('sanity check', () => {
        expect(true).toBeTruthy();
    });

    it('get product by id', (done) => {
        service.getProductById(product.id).then(
            resp => {
                expect(resp.id).toBe(product.id);
                done();
            })
    })


   /* it('adds to cart', (done) => {
        service.addToCart(productId, quantity).toPromise().then(resp => {
            expect(resp.product).toBe(productId);
            expect(resp.pallet_quantity).toBe(quantity);
            done();
        })
    });

    it('updates amount of products in cart', (done) => {
        service.updateProductAmount(productId, newQuantity).toPromise().then(resp => {
            expect(resp.product).toBe(productId);
            expect(resp.pallet_quantity).toBe(newQuantity);

            service.getCart().subscribe((resp: CartProduct[]) => {
                expect(resp[0].product).toBe(productId);
                expect(resp[0].pallet_quantity).toBe(newQuantity);
                done();
            })
        });
    });

    it('gets user\'s cart', (done) => {
        service.getCart().subscribe((resp: CartProduct[]) => {
            expect(resp[0]).toBeTruthy();
            expect(resp[0].product).toBe(productId);
            expect(Object.keys(cartProduct).every(key => resp[0].hasOwnProperty(key))).toBeTruthy();
            done();
        })
    });

    it('deletes product from cart', (done) => {
        service.deleteFromCart(productId).toPromise().then(() => {
            service.getCart().subscribe(resp => {
                expect(resp.length).toBe(0);
                done();
            })
        })
    });

    it('returns cart list as observable', (done) => {
        service.getCartList().subscribe(resp => {
            expect(Array.isArray(resp)).toBeTruthy();
            expect(resp.length).toBe(0);
            done();
        })
    });

    it('updates cart list observable on adding to cart', (done) => {
        service.addToCart(productId, quantity).toPromise().then(() => {
            service.getCartList().subscribe((resp: CartProduct[]) => {
                expect(Array.isArray(resp)).toBeTruthy();
                expect(resp.length).toBe(1);
                expect(Object.keys(cartProduct).every(key => resp[0].hasOwnProperty(key))).toBeTruthy();
                expect(resp[0].product).toBe(productId);
                expect(resp[0].pallet_quantity).toBe(quantity);
                done();
            })
        })
    });

    it('updates cart list observable on updating amount', (done) => {
        service.updateProductAmount(productId, newQuantity).toPromise().then(() => {
            service.getCartList().subscribe(resp => {
                expect(Array.isArray(resp)).toBeTruthy();
                expect(resp.length).toBe(1);
                expect(Object.keys(cartProduct).every(key => resp[0].hasOwnProperty(key))).toBeTruthy();
                expect(resp[0].product).toBe(productId);
                expect(resp[0].pallet_quantity).toBe(newQuantity);
                done();
            })
        })
    });

    it('updates cart list observable on product delete', (done) => {
        service.deleteFromCart(productId).toPromise().then(() => {
            service.getCartList().subscribe(resp => {
                expect(Array.isArray(resp)).toBeTruthy();
                expect(resp.length).toBe(0);
                done();
            })
        })
    });*/
});
