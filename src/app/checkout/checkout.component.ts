import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from '../@shared/api.service';
import {BaseComponent} from '../base.component';
import {Product} from '../@model/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent extends BaseComponent implements OnInit {

  items: Product[];

  constructor(private api: ApiService,
              private snackBar: MatSnackBar,
              private router: Router) {
    super();
    this.viewName = 'checkout';
  }

  ngOnInit(): void {
    this.items = this.api.shoppingCart;
  }

}
