import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { Product, ShopifyService, ProductService } from '../shared';

@Injectable()
export class ProductResolver implements Resolve<Product> {
  constructor(
    private shopifyService: ShopifyService,
    private productService: ProductService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    let id = this.productService.getCorrectId(route.params['id']);
    return Observable.fromPromise(this.shopifyService.getProductById(id)
      .catch((err) => this.router.navigateByUrl('/')));

  }
}

/*Use fromPromise to convert the promise into an observable and use mergeMap to emit the HTTP response into the composed observable:

import { Observable } from 'rxjs/Observable/';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

logout(): Observable<any>{
  return Observable.fromPromise(this.userData.getAuthToken()).mergeMap(token => {
    this.token = token;
    this.headers = new Headers({
      "X-USER-TOKEN": token
    });
    this.options = new RequestOptions({
      headers: this.headers
    });
    var logout_url = "Api logout method";
    return this.http.post(logout_url, {}, this.options).map(res => res.json());
  });
}*/