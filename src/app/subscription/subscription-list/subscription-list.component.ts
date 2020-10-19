import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {ToastrService} from 'ngx-toastr';
import {DefaultSearchCriteria} from '../../@model/core';
import {Subscription} from '../../@model/subscriptin';
import {ApiService} from '../../@shared/api.service';
import {BaseComponent} from '../../base.component';
import {Tran} from '../../@model/tran';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent extends BaseComponent implements OnInit {

  searchCriteria: DefaultSearchCriteria;
  items: Array<Subscription>;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private storage: LocalStorageService) {
    super();
    super.viewName = 'Subscription List';
    this.items = new Array<Subscription>();
  }

  ngOnInit(): void {
    this.searchCriteria = new DefaultSearchCriteria();
    this.searchCriteria.page = 1;
    this.searchCriteria.size = 50;
    this.refresh(false);
  }

  refresh(appendMode: boolean): void {
    this.api.getSubscriptions(this.searchCriteria).subscribe(
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
    const item = new Subscription();
    item.id = 0;
    this.storage.store(Subscription.KEY, item);
    this.router.navigateByUrl('subscription-list/' + item.id + '/add');
  }

  view(item: Subscription): void {
    this.router.navigateByUrl('subscription-list/' + item.id + '/view');
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
      this.items = new Array<Subscription>();
    }
    objs.forEach((o) => {
      const item = Subscription.createFrom(o);
      this.items.push(item);
      // console.log(item);
    });
  }
}
