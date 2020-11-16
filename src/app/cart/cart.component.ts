import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
    this.viewName = 'cart';
  }

  ngOnInit(): void {
  }

}
