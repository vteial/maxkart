import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from '../@shared/api.service';
import {BaseComponent} from '../base.component';
import {Cart, Product, PTran} from '../@model/core';
import {PaymentService} from '../@shared/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent extends BaseComponent implements OnInit {

  @ViewChild('checkoutForm') checkoutFormElement;

  shoppingCart: Cart;

  item: PTran;

  constructor(private api: ApiService,
              private payment: PaymentService,
              private snackBar: MatSnackBar,
              private router: Router) {
    super();
    this.viewName = 'checkout';
  }

  ngOnInit(): void {
    this.shoppingCart = this.api.shoppingCart;

    const model = new PTran();
    model.refNo = 'Some Ref No.';
    model.name = 'Some Name';
    model.email = 'somename@gmail.com';
    model.mobile = '061234567890';
    model.total = this.shoppingCart.totalAmount;
    model.description = 'Some Description';
    this.payment.fillPTranFields(model);

    this.item = model;
  }

  next(): void {
    this.checkoutFormElement.nativeElement.submit();
  }

}
