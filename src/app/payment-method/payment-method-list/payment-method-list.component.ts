import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base.component';
import {DefaultSearchCriteria} from '../../@model/core';
import {ApiService} from '../../@shared/api.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {PaymentMethod} from '../../@model/payment-method';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.css']
})
export class PaymentMethodListComponent extends BaseComponent implements OnInit {

  searchCriteria: DefaultSearchCriteria;

  items: Array<PaymentMethod>;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private storage: LocalStorageService) {
    super();
    super.viewName = 'Payment Method List';
    this.items = new Array<PaymentMethod>();
  }

  ngOnInit(): void {
    this.searchCriteria = new DefaultSearchCriteria();
    this.searchCriteria.page = 1;
    this.searchCriteria.size = 50;
    this.refresh(false);
  }

  refresh(appendMode: boolean): void {
    this.api.getPaymentMethods(this.searchCriteria).subscribe(
      (res: any) => {
        // console.log(res);
        this.processItems(res.items, appendMode);
        this.searchCriteria.page = res.page;
        this.searchCriteria.pages = res.pages;
        if (this.items.length === 0) {
          this.toastr.info('No records found!');
        }
      },
      (error) => console.log(error)
    );
  }

  add(): void {
    this.storage.store(PaymentMethod.KEY, new PaymentMethod());
    this.router.navigateByUrl('payment-method-list/0/add');
  }

  view(item: PaymentMethod): void {
    // this.storage.store(PaymentMethod.KEY, item);
    this.router.navigateByUrl(`payment-method-list/${item.id}/view`);
  }

  onScrollDown(): void {
    if (this.searchCriteria.page < this.searchCriteria.pages) {
      this.searchCriteria.page += 1;
      console.log('going to fetch next page ' + this.searchCriteria.page);
      this.refresh(true);
    } else {
      console.log('there is no more page to fetch...');
    }
  }

  private processItems(objs: any, appendMode: boolean): void {
    if (!appendMode) {
      this.items = new Array<PaymentMethod>();
    }
    objs.forEach((o) => {
      const item = PaymentMethod.createFrom(o);
      this.items.push(item);
      // console.log(item);
    });
  }
}
