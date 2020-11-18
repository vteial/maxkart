import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../base.component';
import {ApiService} from '../@shared/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {Product} from '../@model/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  dColumns: string[] = ['id', 'name', 'rate', 'quantity', 'action'];

  products: Product[];

  constructor(private api: ApiService,
              private snackBar: MatSnackBar,
              private router: Router) {
    super();
    this.viewName = 'home';
  }

  ngOnInit(): void {
    this.products = this.api.productList;
  }

  addToCart(item: Product): void {
    this.snackBar.open('Added to cart...', 'Ok', {
      duration: 3000
    });
  }

}
