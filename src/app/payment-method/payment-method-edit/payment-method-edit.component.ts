import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaymentMethod} from '../../@model/payment-method';
import {ApiService} from '../../@shared/api.service';
import {ToastrService} from 'ngx-toastr';
import {BaseComponent} from '../../base.component';
import {FormGroup} from '@angular/forms';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment-method-edit',
  templateUrl: './payment-method-edit.component.html',
  styleUrls: ['./payment-method-edit.component.css']
})
export class PaymentMethodEditComponent extends BaseComponent implements OnInit {

  @Input()
  isEmbedded = false;

  @Input()
  subscriptionId: number;

  @Input()
  paymentSettings: Array<PaymentMethod>;

  @Input()
  itemId: number;

  @Input()
  item: PaymentMethod;

  itemFg: FormGroup;

  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();

  message: string;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private storage: LocalStorageService,
              private formBuilder: RxFormBuilder) {
    super();
    this.viewName = 'Add/Edit Payment Method Detail';
  }

  ngOnInit(): void {
    console.log(`isEmbedded : ${this.isEmbedded}`);
    if (!this.isEmbedded) {
      const src = this.storage.retrieve(PaymentMethod.KEY);
      this.item = Object.assign(new PaymentMethod(), src);
    }
    if (!this.item.code) {
      this.item.code = null;
    }
    this.itemFg = this.formBuilder.formGroup(this.item);
  }

  save(): void {
    this.message = null;
    if (this.itemFg.invalid) {
      this.message = 'Please fix the error fields by providing valid values.';
      this.toastr.error(this.message);
      return;
    }
    // console.log(this.item);
    if (this.isEmbedded) {
      this.saveTwo();
    } else {
      this.saveOne();
    }
  }

  private saveOne(): void {
    if (this.item.id) {
      this.api.updatePaymentMethod(this.item).subscribe(res => {
        // console.log(res);
        this.toastr.info('Successfully updated...');
        this.router.navigateByUrl('payment-method-list/' + this.item.id + '/view');
      }, (error) => {
        console.log(error);
        if (error.status === 422) {
          this.toastr.error('Unable to update...');
        }
      });
    } else {
      this.api.createPaymentMethod(this.item).subscribe(res => {
        // console.log(res);
        this.toastr.info('Successfully created...');
        this.item.id = res.id;
        this.router.navigateByUrl('payment-method-list/' + this.item.id + '/view');
      }, (error) => {
        console.log(error);
        if (error.status === 422) {
          this.toastr.error('Unable to create...');
        }
      });
    }
  }

  private saveTwo(): void {
    if (this.item.id) {
      this.api.updateSubscriptionPaymentMethod(this.subscriptionId, this.item).subscribe(res => {
        // console.log(res);
        this.toastr.info('Successfully updated...');
      }, (error) => {
        console.log(error);
        if (error.status === 422) {
          this.toastr.error('Unable to update...');
        }
      });
    } else {
      this.api.createSubscriptionPaymentMethod(this.subscriptionId, this.item).subscribe(res => {
        // console.log(res);
        this.toastr.info('Successfully created...');
        this.item.id = res.id;
      }, (error) => {
        console.log(error);
        if (error.status === 422) {
          this.toastr.error('Unable to create...');
        }
      });
    }
  }

  remove(): void {
    if (this.isEmbedded) {
      this.onDelete.emit(this.itemId);
    }
  }

  onCode(): void {
    const model = this.paymentSettings.find(o => o.code === this.item.code);
    console.log(model);
    this.item.code = model.code;
    this.item.name = model.name;
    this.item.type = model.type;
    this.item.amount = model.amount;
    this.item.settlementPeriod = model.settlementPeriod;
    this.item.paymentMethodId = model.id;
    console.log(this.item);
  }

}
