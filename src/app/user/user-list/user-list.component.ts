import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from 'ngx-webstorage';
import {ApiService} from '../../@shared/api.service';
import {BaseComponent} from '../../base.component';
import {UserSearch, UserSearchCriteria} from '../user-common';
import {User} from '../../@model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseComponent implements OnInit {

  searchModel: UserSearch;

  searchCriteria: UserSearchCriteria;

  items: Array<User>;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private storage: LocalStorageService) {
    super();
    super.viewName = 'User List';
    this.items = new Array<User>();
    this.searchCriteria = new UserSearchCriteria();
  }

  ngOnInit(): void {
    this.resetForm();
    this.refresh(false);
  }

  resetForm(): void {
    this.searchModel = new UserSearch();
    this.searchModel.by = 'name';
  }

  search(): void {
    this.toastr.clear();
    // console.log(this.searchModel);
    if (this.searchModel.by === 'idno') {
      this.toastr.info('Search by Id Number will coming soon!', 'Ok!');
    }
    this.searchCriteria = new UserSearchCriteria();
    if (this.searchModel.name) {
      this.searchCriteria.filterFullName = this.searchModel.name;
    }
    console.log(this.searchCriteria);
    this.refresh(false);
  }

  refresh(appendMode: boolean): void {
    if (!appendMode) {
      this.searchCriteria.page = 1;
    }
    this.api.getUsers(this.searchCriteria).subscribe(
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
    this.storage.store('userItem', item);
    this.router.navigateByUrl('user-list/' + item.id + '/view').finally(() => {
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
      this.items = new Array<User>();
    }
    objs.forEach((o) => {
      const item = User.createFrom(o);
      this.items.push(item);
      // console.log(item);
    });
  }

}
