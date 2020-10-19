import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {ToastrService} from 'ngx-toastr';

import {Merchant} from '../../@model/merchant';
import {MerchantSearch, MerchantSearchCriteria} from '../merchant-core';
import {ApiService} from '../../@shared/api.service';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class MerchantListComponent extends BaseComponent implements OnInit {

  searchModel: MerchantSearch;

  searchCriteria: MerchantSearchCriteria;

  items: Array<Merchant>;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private storage: LocalStorageService) {
    super();
    super.viewName = 'Merchant List';
    this.items = new Array<Merchant>();
    this.searchCriteria = new MerchantSearchCriteria();
  }

  ngOnInit(): void {
    this.resetForm();
    this.refresh(false);
  }

  resetForm(): void {
    this.searchModel = new MerchantSearch();
  }

  search(): void {
    this.toastr.clear();
    // console.log(this.searchModel);
    this.searchCriteria = new MerchantSearchCriteria();
    if (this.searchModel.idno) {
      this.searchCriteria.idno = this.searchModel.idno;
    }
    if (this.searchModel.name) {
      this.searchCriteria.name = this.searchModel.name;
    }
    console.log(this.searchCriteria);
    this.refresh(false);
  }

  refresh(appendMode: boolean): void {
    if (!appendMode) {
      this.searchCriteria.page = 1;
    }
    this.api.getMerchants(this.searchCriteria).subscribe(
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
    this.storage.store(Merchant.KEY, item);
    this.router.navigateByUrl('merchant-list/' + item.id + '/view').finally(() => {
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
      this.items = new Array<Merchant>();
    }
    objs.forEach((o) => {
      const item = Merchant.createFrom(o);
      this.items.push(item);
      // console.log(item);
    });
  }
}
