import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {FormGroup} from '@angular/forms';
import {RxFormBuilder} from '@rxweb/reactive-form-validators';
import {Router} from '@angular/router';
import {LocalStorageService} from 'ngx-webstorage';
import {BaseComponent} from '../../base.component';
import {User} from '../../@model/user';
import {ApiService} from '../../@shared/api.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent extends BaseComponent implements OnInit {

  item: User;
  itemFg: FormGroup;

  profileImageUrl: string;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private storage: LocalStorageService,
              private router: Router,
              private formBuilder: RxFormBuilder) {
    super();
    super.viewName = 'Edit Profile';
  }

  ngOnInit(): void {
    this.profileImageUrl = 'assets/images/avatar_2x.png';
    this.item = this.storage.retrieve('profileItem');
    if (!this.item.idNo) {
      this.item.idNo = '-';
    }
    this.prepareProfileImageUrl();
    this.itemFg = this.formBuilder.formGroup(this.item);
    // console.log(this.item);
    // this.api.fetchCurrentUser().subscribe((data) => {
    //   // console.log(data);
    //   this.item = User.createFrom(data);
    //   if (!this.item.idNo) {
    //     this.item.idNo = '-';
    //   }
    //   this.prepareProfileImageUrl();
    //   this.itemFg = this.formBuilder.formGroup(this.item);
    //   // console.log(this.item);
    // });
  }

  private prepareProfileImageUrl(): void {
    this.item.docs.forEach((doc) => {
      if (doc.name === 'profilePhoto') {
        doc.srcUrl = this.api.getApiPrefix() + doc.srcPath;
        doc.srcUrl += '?apiKey=' + this.api.sessionUser.accessToken;
        doc.srcUrl += '&rand=' + Math.random();
        this.profileImageUrl = doc.srcUrl;
      }
    });
  }

  onFileName(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.api.uploadData('user', this.item.id,
        'profilePhoto', file).subscribe((data) => {
        // console.log(data);
        this.toastr.info('Successfully uploaded...');
        this.prepareProfileImageUrl();
      }, (error) => {
        console.log(error);
        Swal.fire('Error!', 'Oops! Upload failed...', 'error');
      });
    }
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
      this.router.navigateByUrl('profile').finally(() => {
      });
    }, (error) => {
      console.log(error);
      if (error.status === 422) {
        this.toastr.error('Unable to update...');
      }
    });
  }

}
