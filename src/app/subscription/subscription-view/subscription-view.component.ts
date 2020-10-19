import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../../base.component';
import {Subscription} from '../../@model/subscriptin';
import {ApiService} from '../../@shared/api.service';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from 'ngx-webstorage';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-subscription-view',
  templateUrl: './subscription-view.component.html',
  styleUrls: ['./subscription-view.component.css']
})
export class SubscriptionViewComponent extends BaseComponent implements OnInit {

  itemId: number;

  item: Subscription;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private storage: LocalStorageService) {
    super();
    this.viewName = 'Subscription Detail';
  }

  ngOnInit(): void {
    this.itemId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    // console.log(`itemId : ${this.itemId}`);
    this.refresh();
  }

  refresh(): void {
    this.api.findSubscriptionById(this.itemId).subscribe(res => {
      console.log(res);
      this.item = Subscription.createFrom(res);
      this.storage.store(Subscription.KEY, this.item);
      // console.log(this.item);
      console.log(this.item.sourceMap);
    }, (error => {
      // console.log(error);
      console.log(`Subscription with id( ${this.itemId} ) doesn"t exist...`);
    }));
  }

}
