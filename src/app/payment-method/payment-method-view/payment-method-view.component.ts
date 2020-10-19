import {Component, Input, OnInit} from '@angular/core';
import {BaseComponent} from '../../base.component';
import {ApiService} from '../../@shared/api.service';
import {ToastrService} from 'ngx-toastr';
import {PaymentMethod} from '../../@model/payment-method';
import {LocalStorageService} from 'ngx-webstorage';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-payment-method-view',
  templateUrl: './payment-method-view.component.html',
  styleUrls: ['./payment-method-view.component.css']
})
export class PaymentMethodViewComponent extends BaseComponent implements OnInit {

  @Input()
  isEmbedded = false;

  @Input()
  itemId: number;

  @Input()
  item: PaymentMethod;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private storage: LocalStorageService) {
    super();
    this.viewName = 'Payment Method Detail';
  }

  ngOnInit(): void {
    console.log(`isEmbedded : ${this.isEmbedded}`);
    if (!this.isEmbedded) {
      this.itemId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      // console.log(`itemId : ${this.itemId}`);
      this.refresh();
    }
  }

  refresh(): void {
    this.api.findPaymentMethodById(this.itemId).subscribe(res => {
      // console.log(data);
      this.item = PaymentMethod.createFrom(res);
      this.storage.store(PaymentMethod.KEY, this.item);
      // console.log(this.item);
      // console.log(this.item.sourceMap);
    }, (error => {
      // console.log(error);
      console.log(`PaymentMethod with id( ${this.itemId} ) doesn"t exist...`);
    }));
  }
}
