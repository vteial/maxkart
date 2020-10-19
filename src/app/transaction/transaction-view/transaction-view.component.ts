import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from 'ngx-webstorage';
import {ApiService} from '../../@shared/api.service';
import {BaseComponent} from '../../base.component';
import {Tran} from '../../@model/tran';
import {User} from '../../@model/user';
import {Merchant} from '../../@model/merchant';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent extends BaseComponent implements OnInit {

  itemId: number;

  item: Tran;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute,
              private storage: LocalStorageService) {
    super();
    super.viewName = 'Transaction Detail';
  }

  ngOnInit(): void {
    this.itemId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    // console.log(`itemId : ${this.itemId}`);
    this.refresh();
  }

  refresh(): void {
    if (!this.itemId) {
      this.toastr.error('Invalid tran id or it doens"t exists...');
      return;
    }
    this.api.findByTranId(this.itemId).subscribe(data => {
      console.log(data);
      this.item = Tran.createFrom(data);
      if (data.merchant) {
        this.item.merchant = new Merchant();
        this.item.merchant.name = data.merchant.name;
      }
      console.log(this.item);
      // this.fetchMerchant();
    });
  }

  // private fetchMerchant(): void {
  //   this.api.findMerchantById(this.item.merchantId).subscribe((data: any) => {
  //     // console.log(data);
  //     this.item.merchant = Merchant.createFrom(data);
  //     // console.log(this.item.merchant);
  //     this.fetchUser(this.item.merchant.userId);
  //   }, (error => {
  //     // console.log(error);
  //     console.log(`Merchant with id( ${this.item.merchantId} ) doesn"t exist...`);
  //   }));
  // }

  // private fetchUser(id: number): void {
  //   this.api.findUserById(id).subscribe((data: any) => {
  //     // console.log(data);
  //     this.item.merchant.user = User.createFrom(data);
  //     console.log(this.item.merchant.user);
  //   }, (error => {
  //     // console.log(error);
  //     console.log(`User with id( ${id} ) doesn"t exist...`);
  //   }));
  // }

}
