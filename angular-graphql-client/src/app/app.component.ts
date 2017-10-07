import { Component } from '@angular/core';
import { GlobalService} from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    globalService: GlobalService,
  ){

  }
  title = 'test Shopify Storefront app';
}
