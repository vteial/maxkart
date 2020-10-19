import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from 'ngx-webstorage';
import {BaseComponent} from '../../base.component';
import {ApiService} from '../../@shared/api.service';
import {TransactionSearch, TransactionSearchCriteria} from '../transaction-common';
import {MerchantSearchCriteria} from '../../merchant/merchant-core';
import {Merchant} from '../../@model/merchant';
import {Tran} from '../../@model/tran';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent extends BaseComponent implements OnInit {

  searchModel: TransactionSearch;
  searchCriteria: TransactionSearchCriteria;

  merchantLst = new Array<Merchant>();
  merchantMap = new Map<number, Merchant>();
  items: Array<Tran>;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private storage: LocalStorageService) {
    super();
    super.viewName = 'Transaction List';
    this.items = new Array<Tran>();
    this.searchCriteria = new TransactionSearchCriteria();
  }

  ngOnInit(): void {
    this.resetForm();
    this.refresh(false);
    const msc = new MerchantSearchCriteria();
    msc.page = 1;
    msc.size = 50;
    this.api.getMerchants(msc).subscribe(
      (res: any) => {
        // console.log(res);
        res.items.forEach(o => {
          const m = Merchant.createFrom(o);
          this.merchantMap.set(m.id, m);
          this.merchantLst.push(m);
        });
      },
      (error) => console.log(error)
    );
  }

  resetForm(): void {
    this.searchModel = new TransactionSearch();
    this.searchModel.name = '-';
  }

  search(): void {
    this.toastr.clear();
    // console.log(this.searchModel);
    this.searchCriteria = new TransactionSearchCriteria();
    if (this.searchModel.orderNo) {
      this.searchCriteria.orderNo = this.searchModel.orderNo;
    }
    if (this.searchModel.name) {
      this.searchCriteria.name = this.searchModel.name;
    }
    if (this.searchModel.status) {
      this.searchCriteria.status = this.searchModel.status;
    }
    console.log(this.searchCriteria);
    this.refresh(false);
  }

  refresh(appendMode: boolean): void {
    if (!appendMode) {
      this.searchCriteria.page = 1;
    }
    this.api.getTransactions(this.searchCriteria).subscribe(
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

  view(item: any): void {
    // console.log(item);
    this.storage.store(Tran.KEY, item);
    this.router.navigateByUrl('transaction-list/' + item.id + '/view').finally(() => {
    });
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
      this.items = new Array<Tran>();
    }
    objs.forEach((o) => {
      const item = Tran.createFrom(o);
      console.log(item);
      item.merchant = this.merchantMap.get(item.merchantId);
      this.items.push(item);
      // console.log(item);
    });
  }
}
