import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {LocalStorageService} from 'ngx-webstorage';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {BaseComponent} from '../../base.component';
import {ApiService} from '../../@shared/api.service';
import {FormGroup} from '@angular/forms';
import {User} from '../../@model/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent extends BaseComponent implements OnInit {

  item: User;
  itemFg: FormGroup;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private router: Router,
              private storage: LocalStorageService,
              private formBuilder: RxFormBuilder) {
    super();
    super.viewName = 'Edit User';
  }

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    const src = this.storage.retrieve('userItem');
    this.item = User.createFrom(src);
    // console.log(this.item);
    this.itemFg = this.formBuilder.formGroup(this.item);
  }

  save(): void {
    // console.log(this.itemFg);
    if (this.itemFg.invalid) {
      this.toastr.error('Please fix the error fields by providing valid values.');
      return;
    }
    this.api.updateUser(this.item).subscribe((data: any) => {
      console.log(data);
      this.toastr.info('Successfully updated...');
      this.router.navigateByUrl('user-list/' + this.item.id + '/view').finally(() => {
      });
    }, (error) => {
      console.log(error);
      if (error.status === 422) {
        this.toastr.error('Unable to update...');
      }
    });
  }
}
