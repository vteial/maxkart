import Swal from 'sweetalert2';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from 'ngx-webstorage';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

import {BaseComponent} from '../../base.component';
import {ApiService} from '../../@shared/api.service';
import {Doc} from '../../@model/doc';
import {User, UserStatus} from '../../@model/user';
import {Merchant, MerchantStatus} from '../../@model/merchant';
import {DocViewerComponent} from '../../common/doc-viewer/doc-viewer.component';
import {NeedMoreInfoComponent} from '../../common/need-more-info/need-more-info.component';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent extends BaseComponent implements OnInit {

  itemId: number;

  item: User;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private storage: LocalStorageService,
              private modalService: BsModalService) {
    super();
    super.viewName = 'User Detail';
  }

  ngOnInit(): void {
    this.itemId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    // console.log(`itemId : ${this.itemId}`);
    this.refresh();
  }

  refresh(): void {
    // const src = this.storage.retrieve(User.KEY);
    // this.item = Object.assign(new User(), src);
    this.api.findUserById(this.itemId).subscribe((data: any) => {
      // console.log(data);
      this.item = User.createFrom(data);
      // console.log(this.item);
      // console.log(this.item.sourceMap);
    }, (error => {
      // console.log(error);
      console.log(`User with id( ${this.itemId} ) doesn"t exist...`);
    }));
  }

  makeApprove(): void {
    this.api.approveUser(this.item).subscribe((data: any) => {
      console.log(data);
      this.item.status = UserStatus.ACTIVE;
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
    this.api.rejectUser(this.item).subscribe((data: any) => {
      console.log(data);
      this.item.status = UserStatus.REJECTED;
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
    const initialState = {class: 'gray modal-lg', needMoreFor: 'user', itemId: this.item.id};
    const bsModalRef: BsModalRef = this.modalService.show(NeedMoreInfoComponent,
      {class: 'gray modal-lg', initialState});
  }

  makeActive(): void {
    Swal.fire('Info!', 'Active feature will come soon...', 'info');
  }

  makeInActive(): void {
    Swal.fire('Info!', 'Block feature will come soon...', 'info');
  }

  onMerchantOwnSelection(): void {
    console.log('merchantOwnId : ' + this.item.merchantOwnId);
    const m = this.item.merchantOwns.find(o => {
      // tslint:disable-next-line:triple-equals
      // console.log(o.id + ' === ' + this.item.merchantOwnId + ' => ' + (o.id == this.item.merchantOwnId));
      // tslint:disable-next-line:triple-equals
      return o.id == this.item.merchantOwnId;
    });
    // console.log(m);
    if (m) {
      this.item.merchantOwn = m;
      // console.log(`onMerchantOwnSelection : ${this.item.merchantOwnId} = ${this.item.merchantOwn.id}`);
    }
  }

  makeMerchantOwnApprove(): void {
    this.api.approveMerchant(this.item.merchantOwn).subscribe((data: any) => {
      console.log(data);
      this.item.merchantOwn.status = MerchantStatus.ACTIVE;
      this.item.merchantOwn.computeStatusClazz();
      this.toastr.info('Successfully approved...');
    }, (error) => {
      console.log(error);
      if (error.status === 422) {
        this.toastr.error('Unable to approve...');
      }
    });
  }

  makeMerchantOwnReject(): void {
    this.api.rejectMerchant(this.item.merchantOwn).subscribe((data: any) => {
      console.log(data);
      this.item.merchantOwn.status = MerchantStatus.REJECTED;
      this.item.merchantOwn.computeStatusClazz();
      this.toastr.info('Successfully rejected...');
    }, (error) => {
      console.log(error);
      if (error.status === 422) {
        this.toastr.error('Unable to reject...');
      }
    });
  }

  makeMerchantOwnNeedInfo(): void {
    const initialState = {class: 'gray modal-lg', needMoreFor: 'merchant', itemId: this.item.merchantOwn.id};
    const bsModalRef: BsModalRef = this.modalService.show(NeedMoreInfoComponent,
      {class: 'gray modal-lg', initialState});
  }

  makeMerchantOwnActive(): void {
    Swal.fire('Info!', 'Active feature will come soon...', 'info');
  }

  makeMerchantOwnInActive(): void {
    Swal.fire('Info!', 'Block feature will come soon...', 'info');
  }

  onMerchantModerateSelection(): void {
    const m = this.item.merchantModerates.find(o => o.id === this.item.merchantModerateId);
    if (m) {
      this.item.merchantModerate = m;
      console.log(`onMerchantModerateSelection : ${this.item.merchantModerateId} = ${this.item.merchantModerate.id}`);
    }
  }

  makeMerchantModerateApprove(): void {
    this.api.approveMerchant(this.item.merchantModerate).subscribe((data: any) => {
      console.log(data);
      this.item.merchantOwn.status = MerchantStatus.ACTIVE;
      this.item.merchantOwn.computeStatusClazz();
      this.toastr.info('Successfully approved...');
    }, (error) => {
      console.log(error);
      if (error.status === 422) {
        this.toastr.error('Unable to approve...');
      }
    });
  }

  makeMerchantModerateReject(): void {
    this.api.rejectMerchant(this.item.merchantModerate).subscribe((data: any) => {
      console.log(data);
      this.item.merchantOwn.status = MerchantStatus.REJECTED;
      this.item.merchantOwn.computeStatusClazz();
      this.toastr.info('Successfully rejected...');
    }, (error) => {
      console.log(error);
      if (error.status === 422) {
        this.toastr.error('Unable to reject...');
      }
    });
  }

  makeMerchantModerateNeedInfo(): void {
    const initialState = {class: 'gray modal-lg', needMoreFor: 'merchant', itemId: this.item.merchantModerate.id};
    const bsModalRef: BsModalRef = this.modalService.show(NeedMoreInfoComponent,
      {class: 'gray modal-lg', initialState});
  }

  makeMerchantModerateActive(): void {
    Swal.fire('Info!', 'Active feature will come soon...', 'info');
  }

  makeMerchantModerateInActive(): void {
    Swal.fire('Info!', 'Block feature will come soon...', 'info');
  }

  showDoc(item: Doc): void {
    item.srcUrl = this.api.getApiPrefix() + item.srcPath + '?apiKey=' + this.api.sessionUser.accessToken;
    const initialState = {doc: item};
    this.modalService.show(DocViewerComponent, {initialState});
  }
}

