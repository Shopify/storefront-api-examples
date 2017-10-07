import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { ProductResolver } from './product-resolver.service';

const productRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'product/:id',
    component: ProductComponent,
    resolve: {
      product: ProductResolver
    }
  }
]);

@NgModule({
  imports: [
    BrowserModule,
    productRouting
  ],
  declarations: [
    ProductComponent
  ],

  providers: [
    ProductResolver
  ]
})
export class ProductModule {}
