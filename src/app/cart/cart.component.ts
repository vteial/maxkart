import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../base.component';
import {ApiService} from '../@shared/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {Product} from '../@model/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent extends BaseComponent implements OnInit {

  dColumns: string[] = ['id', 'name', 'rate', 'quantity', 'action'];

  items: Product[];

  constructor(private api: ApiService,
              private snackBar: MatSnackBar,
              private router: Router) {
    super();
    this.viewName = 'cart';
  }

  ngOnInit(): void {
    this.items = this.api.shoppingCart;
  }

  removeFromCart(index: number): void {
    this.snackBar.open('Removed from cart...', 'Ok', {
      duration: 3000
    });
  }

}
