import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {ChangePasswordDto} from '../../@model/core';
import {User} from '../../@model/user';
import {ApiService} from '../../@shared/api.service';
import {BaseComponent} from '../../base.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent extends BaseComponent implements OnInit {

  user: User;

  message: string;

  item: ChangePasswordDto;

  itemFg: FormGroup;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private formBuilder: RxFormBuilder,
              public bsModalRef: BsModalRef) {
    super();
    this.viewName = 'Change Password';
  }

  ngOnInit(): void {
    this.item = new ChangePasswordDto();
    this.itemFg = this.formBuilder.formGroup(this.item);
  }

  save(): void {
    console.log(this.itemFg);
    if (this.itemFg.invalid) {
      this.message = 'Please fix error fields...';
      return;
    }
    this.user.password = this.item.newPassword;
    this.api.updateUser(this.user).subscribe((data: any) => {
      console.log(data);
      this.toastr.success('Password changed successfully...');
      this.bsModalRef.hide();
    }, (error) => {
      console.log(error);
      if (error.status === 422) {
        this.message = 'Change password failed...';
      }
    });
  }

}
