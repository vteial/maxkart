import {Component, OnInit} from '@angular/core';
import {ReactiveFormConfig} from '@rxweb/reactive-form-validators';
import {ApiService} from './@shared/api.service';
import {PaymentService} from './@shared/payment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  appTitle = 'MaxKart';

  appDescription = 'Max Gold Shop';

  constructor(private api: ApiService,
              private payment: PaymentService) {
    ReactiveFormConfig.set({
      validationMessage: {
        required: 'This field is required.',
        alpha: 'This should have only alphabets and spaces.',
        minLength: 'This should have minimum of {{0}} characters.',
        password: 'This should satisfy the above condition.',
        compare: 'This should match with another field'
      }
    });
  }

  ngOnInit(): void {
    // this.payment.fetchCollectionAndSetCollectionId();
    this.api.fetchUsers();
    this.api.fetchProducts();
  }

}
