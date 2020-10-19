import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {LocalStorageService} from 'ngx-webstorage';
import {ToastrService} from 'ngx-toastr';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {BsModalService} from 'ngx-bootstrap/modal';

import {ApiService} from '../../@shared/api.service';
import {Merchant} from '../../@model/merchant';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'app-merchant-edit',
  templateUrl: './merchant-edit.component.html',
  styleUrls: ['./merchant-edit.component.css']
})
export class MerchantEditComponent extends BaseComponent implements OnInit {

  item: Merchant;

  itemFg: FormGroup;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private storage: LocalStorageService,
              private formBuilder: RxFormBuilder,
              private modalService: BsModalService) {
    super();
    super.viewName = 'Edit Merchant';
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    const src = this.storage.retrieve(Merchant.KEY);
    this.item = Object.assign(new Merchant(), src);
    // console.log(this.item);
    this.itemFg = this.formBuilder.formGroup(this.item);
  }

  save(): void {
    // console.log(this.itemFg);
    if (this.itemFg.invalid) {
      this.toastr.error('Please fix the error fields by providing valid values.');
      return;
    }
    this.api.updateMerchant(this.item).subscribe((data: any) => {
      console.log(data);
      this.toastr.info('Successfully updated...');
      this.router.navigateByUrl('merchant-list/' + this.item.id + '/view').finally(() => {
      });
    }, (error) => {
      console.log(error);
      if (error.status === 422) {
        this.toastr.error('Unable to update...');
      }
    });
  }

}
