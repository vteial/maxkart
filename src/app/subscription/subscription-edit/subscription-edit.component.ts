import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from 'ngx-webstorage';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {Subscription} from '../../@model/subscriptin';
import {ApiService} from '../../@shared/api.service';
import {BaseComponent} from '../../base.component';
import {PaymentMethod} from '../../@model/payment-method';
import {DefaultSearchCriteria} from '../../@model/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-subscription-edit',
  templateUrl: './subscription-edit.component.html',
  styleUrls: ['./subscription-edit.component.css']
})
export class SubscriptionEditComponent extends BaseComponent implements OnInit {

  backLink: string;

  paymentSettings: Array<PaymentMethod>;

  item: Subscription;

  itemFg: FormGroup;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private storage: LocalStorageService,
              private formBuilder: RxFormBuilder) {
    super();
    this.viewName = 'Add / Edit Subscription';
    this.backLink = '/subscription-list';
  }

  ngOnInit(): void {
    const sc = new DefaultSearchCriteria();
    sc.page = 1;
    sc.size = 50;
    this.api.getPaymentMethods(sc).subscribe(res => {
      this.paymentSettings = new Array<PaymentMethod>();
      res.items.forEach(o => {
        this.paymentSettings.push(PaymentMethod.createFrom(o));
      });
    });
    this.refresh();
  }

  refresh(): void {
    const src = this.storage.retrieve(Subscription.KEY);
    this.item = Object.assign(new Subscription(), src);
    if (this.item.id && this.item.id !== 0) {
      this.backLink = `/subscription-list/${this.item.id}/view`;
      this.viewName = 'Edit Subscription';
    } else {
      this.backLink = '/subscription-list';
      this.viewName = 'Add Subscription';
    }
    console.log(this.backLink);
    // console.log(this.viewName);
    // console.log(this.item);
    this.itemFg = this.formBuilder.formGroup(this.item);
    // console.log(this.itemFg);
  }

  save(): void {
    if (this.itemFg.invalid) {
      this.toastr.error('Please fix the error fields by providing valid values.');
      return;
    }
    // console.log(this.item);
    if (this.item.id) {
      this.api.updateSubscription(this.item).subscribe(res => {
        console.log(res);
        this.toastr.info('Successfully updated...');
        this.router.navigateByUrl('subscription-list/' + this.item.id + '/view').finally(() => {
        });
      }, (error) => {
        console.log(error);
        if (error.status === 422) {
          this.toastr.error('Unable to update...');
        }
      });
    } else {
      this.api.createSubscription(this.item).subscribe(res => {
        console.log(res);
        this.item.id = res.subscriptionId;
        this.toastr.info('Successfully created...');
        this.router.navigateByUrl('subscription-list/' + this.item.id + '/view').finally(() => {
        });
      }, (error) => {
        console.log(error);
        if (error.status === 422) {
          this.toastr.error('Unable to create...');
        }
      });
    }
  }

  // onEnableFpx(event: PrettyRadioChange): void {
  //   console.log(`enableFpx = ${event.checked} ${event.value}`);
  //   this.item.enableFpx = event.value;
  // }
  //
  // onEnableCc(event: PrettyRadioChange): void {
  //   console.log(`enableCc = ${event.checked} ${event.value}`);
  //   this.item.enableCc = event.value;
  // }
  //
  // onIsItForPublic(event: PrettyRadioChange): void {
  //   console.log(`isItForPublic = ${event.checked} ${event.value}`);
  //   this.item.isItForPublic = event.value;
  // }

  add(): void {
    const model = new PaymentMethod();
    model.compute();
    this.item.paymentMethods.push(model);
  }

  removePaymentMethod(index: number): void {
    console.log(`index : ${index}`);
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure to delete this?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        const pm = this.item.paymentMethods[index];
        if (pm.id) {
          this.toastr.warning('Delete is not yet implemented...');
        } else {
          console.log(this.item.paymentMethods.splice(index, 1));
        }
      }
    });
  }

  remove(): void {
    this.toastr.warning('Delete is not yet implemented...');
  }
}
