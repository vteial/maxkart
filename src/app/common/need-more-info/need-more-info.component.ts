import {Component, OnInit, Optional} from '@angular/core';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {BaseComponent} from '../../base.component';
import {NeedMoreInfo} from '../../@model/core';
import {ApiService} from '../../@shared/api.service';
import {ToastrService} from 'ngx-toastr';
import {FormGroup} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-need-more-info',
  templateUrl: './need-more-info.component.html',
  styleUrls: ['./need-more-info.component.css']
})
export class NeedMoreInfoComponent extends BaseComponent implements OnInit {

  message: string;

  item: NeedMoreInfo;

  itemFg: FormGroup;

  items: Array<NeedMoreInfo>;

  itemId: number;

  needMoreFor: string;

  reqModel: any;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private formBuilder: RxFormBuilder,
              @Optional() public bsModalRef: BsModalRef) {
    super();
    super.viewName = 'Need More Info';
  }

  ngOnInit(): void {
    console.log(`needFor : ${this.needMoreFor} itemId: ${this.itemId}`);
    this.items = new Array<NeedMoreInfo>();
    this.add();
  }

  add(): void {
    if (this.item && this.itemFg.invalid) {
      this.toastr.error('Please provide valid values for the fields...');
      if (!this.item.message || this.item.message === '') {
        this.message = 'Please provide the message...';
        return;
      }
      if (this.item.type === NeedMoreInfo.TYPE_FILE && (!this.item.fileName || this.item.fileName === '')) {
        this.message = 'Please provide the file name...';
        return;
      }
      return;
    }
    this.item = new NeedMoreInfo();
    this.itemFg = this.formBuilder.formGroup(this.item);
    this.items.push(this.item);
  }

  edit(index: number): void {
    this.item = this.items[index];
    this.itemFg = this.formBuilder.formGroup(this.item);
  }

  remove(index: number): void {
    this.items.splice(index, 1);
    if (this.items.length === 0) {
      this.add();
    } else {
      if (index > 0) {
        index -= 1;
      }
      this.edit(index);
    }
  }

  save(): void {
    if (this.itemFg.invalid) {
      this.message = 'Please provide valid values for the fields...';
      this.toastr.error(this.message);
      return;
    }
    this.prepareRequestModel();
    if (!this.needMoreFor) {
      return;
    }
    if (this.needMoreFor === 'user') {
      this.api.needMoreInfoUser(this.itemId, this.reqModel).subscribe(res => {
        console.log(res);
        this.toastr.info('Successfully submitted...');
        this.bsModalRef.hide();
      }, error => {
        this.toastr.error('Oops! There was an issue on submitting...');
      });
    } else {
      this.api.needMoreInfoMerchant(this.itemId, this.reqModel).subscribe(res => {
        console.log(res);
        this.toastr.info('Successfully submitted...');
        this.bsModalRef.hide();
      }, error => {
        this.toastr.error('Oops! There was an issue on submitting...');
      });
    }
  }

  private prepareRequestModel(): void {
    let hp = new HttpParams();
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      hp = hp.set(`type[${i}]`, item.type);
      hp = hp.set(`message[${i}]`, item.message);
      if (item.type === NeedMoreInfo.TYPE_FILE) {
        hp = hp.set(`fileName[${i}]`, item.fileName);
      }
    }
    this.reqModel = hp;
  }
}
