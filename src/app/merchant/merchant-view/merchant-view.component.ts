import Swal from 'sweetalert2';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from 'ngx-webstorage';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

import {ApiService} from '../../@shared/api.service';
import {UserStatus} from '../../@model/user';
import {Merchant, MerchantStatus} from '../../@model/merchant';
import {Subscription} from '../../@model/subscriptin';
import {BaseComponent} from '../../base.component';
import {Doc} from '../../@model/doc';
import {DocViewerComponent} from '../../common/doc-viewer/doc-viewer.component';
import {NeedMoreInfoComponent} from '../../common/need-more-info/need-more-info.component';

@Component({
  selector: 'app-merchant-view',
  templateUrl: './merchant-view.component.html',
  styleUrls: ['./merchant-view.component.css']
})
export class MerchantViewComponent extends BaseComponent implements OnInit {

  itemId: number;

  item: Merchant;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private storage: LocalStorageService,
              private modalService: BsModalService) {
    super();
    super.viewName = 'Merchant Detail';
  }

  ngOnInit(): void {
    this.itemId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    // console.log(`itemId : ${this.itemId}`);
    this.refresh();
  }

  refresh(): void {
    this.api.findMerchantById(this.itemId).subscribe(res => {
      // console.log(data);
      this.item = Merchant.createFrom(res);
      // console.log(this.item);
      // console.log(this.item.sourceMap);
    }, (error => {
      // console.log(error);
      console.log(`Merchant with id( ${this.itemId} ) doesn"t exist...`);
    }));
  }

  viewSubscription(): void {
    this.storage.store(Subscription.KEY, this.item.subscription);
    this.router.navigateByUrl('subscription-list/' + this.item.subscriptionId + '/view');
  }

  makeApprove(): void {
    this.api.approveMerchant(this.item).subscribe((data: any) => {
      console.log(data);
      this.item.status = MerchantStatus.ACTIVE;
      this.item.computeStatusClazz();
      this.toastr.info('Successfully approved...');
    }, (error) => {
      console.log(error);
      if (error.status === 422) {
        this.toastr.error('Unable to approve...');
      }
    });
  }

  makeReject(): void {
    this.api.rejectMerchant(this.item).subscribe((data: any) => {
      console.log(data);
      this.item.status = MerchantStatus.REJECTED;
      this.item.computeStatusClazz();
      this.toastr.info('Successfully rejected...');
    }, (error) => {
      console.log(error);
      if (error.status === 422) {
        this.toastr.error('Unable to reject...');
      }
    });
  }

  makeNeedInfo(): void {
    const initialState = {class: 'gray modal-lg', needMoreFor: 'merchant', itemId: this.item.id};
    const bsModalRef: BsModalRef = this.modalService.show(NeedMoreInfoComponent,
      {class: 'gray modal-lg', initialState});
  }

  makeActive(): void {
    Swal.fire('Info!', 'Active feature will come soon...', 'info');
  }

  makeInActive(): void {
    Swal.fire('Info!', 'Block feature will come soon...', 'info');
  }

  makeUserOwnerApprove(): void {
    this.api.approveUser(this.item.userOwner).subscribe(data => {
      console.log(data);
      this.item.userOwner.status = UserStatus.ACTIVE;
      this.item.userOwner.computeStatusClazz();
      this.toastr.info('Successfully approved...');
    }, (error) => {
      console.log(error);
      if (error.status === 422) {
        this.toastr.error('Unable to approve...');
      }
    });
  }

  makeUserOwnerReject(): void {
    this.api.rejectUser(this.item.userOwner).subscribe(data => {
      console.log(data);
      this.item.userOwner.status = UserStatus.REJECTED;
      this.item.userOwner.computeStatusClazz();
      this.toastr.info('Successfully rejected...');
    }, (error) => {
      console.log(error);
      if (error.status === 422) {
        this.toastr.error('Unable to reject...');
      }
    });
  }

  makeUserOwnerNeedInfo(): void {
    const initialState = {class: 'gray modal-lg', needMoreFor: 'user', itemId: this.item.userOwner.id};
    const bsModalRef: BsModalRef = this.modalService.show(NeedMoreInfoComponent,
      {class: 'gray modal-lg', initialState});
  }

  makeUserOwnerActive(): void {
    Swal.fire('Info!', 'Active feature will come soon...', 'info');
  }

  makeUserOwnerInActive(): void {
    Swal.fire('Info!', 'Block feature will come soon...', 'info');
  }

  onUserModeratorSelection(): void {
    const user = this.item.userModerators.find(o => o.id === this.item.userModeratorId);
    if (user) {
      this.item.userModerator = user;
      console.log(`onUserModeratorSelection : ${this.item.userModerator.id} = ${this.item.userModeratorId}`);
    }
  }

  makeUserModeratorApprove(): void {
    this.api.approveUser(this.item.userModerator).subscribe((data: any) => {
      console.log(data);
      this.item.userModerator.status = UserStatus.ACTIVE;
      this.item.userModerator.computeStatusClazz();
      this.toastr.info('Successfully approved...');
    }, (error) => {
      console.log(error);
      if (error.status === 422) {
        this.toastr.error('Unable to approve...');
      }
    });
  }

  makeUserModeratorReject(): void {
    this.api.rejectUser(this.item.userModerator).subscribe((data: any) => {
      console.log(data);
      this.item.userModerator.status = UserStatus.REJECTED;
      this.item.userModerator.computeStatusClazz();
      this.toastr.info('Successfully rejected...');
    }, (error) => {
      console.log(error);
      if (error.status === 422) {
        this.toastr.error('Unable to reject...');
      }
    });
  }

  makeUserModeratorNeedInfo(): void {
    const initialState = {class: 'gray modal-lg', needMoreFor: 'user', itemId: this.item.userModerator.id};
    const bsModalRef: BsModalRef = this.modalService.show(NeedMoreInfoComponent,
      {class: 'gray modal-lg', initialState});
  }

  makeUserModeratorActive(): void {
    Swal.fire('Info!', 'Active feature will come soon...', 'info');
  }

  makeUserModeratorInActive(): void {
    Swal.fire('Info!', 'Block feature will come soon...', 'info');
  }

  showDoc(item: Doc): void {
    item.srcUrl = this.api.getApiPrefix() + item.srcPath + '?apiKey=' + this.api.sessionUser.accessToken;
    const initialState = {doc: item};
    this.modalService.show(DocViewerComponent, {initialState});
  }
}
