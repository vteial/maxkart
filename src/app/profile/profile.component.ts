import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';
import {ToastrService} from 'ngx-toastr';
import {BsModalService} from 'ngx-bootstrap/modal';
import {User} from '../@model/user';
import {ApiService} from '../@shared/api.service';
import {BaseComponent} from '../base.component';
import {ChangePasswordComponent} from './change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends BaseComponent implements OnInit {

  item: User;

  profileImageUrl: string;

  constructor(private api: ApiService,
              private toastr: ToastrService,
              private storage: LocalStorageService,
              private modalService: BsModalService) {
    super();
    super.viewName = 'Profile';
  }

  ngOnInit(): void {
    this.profileImageUrl = 'assets/images/avatar_2x.png';
    this.api.fetchCurrentUser().subscribe((data) => {
      // console.log(data);
      this.item = User.createFrom(data);
      this.prepareProfileImageUrl();
      this.storage.store('profileItem', this.item);
      // console.log(this.item);
    });
  }

  showChangePassword(): void {
    const initialState = {user: this.item};
    this.modalService.show(ChangePasswordComponent, {initialState});
  }

  private prepareProfileImageUrl(): void {
    this.item.docs.forEach((doc) => {
      if (doc.name === 'profilePhoto') {
        doc.srcUrl = this.api.getApiPrefix() + doc.srcPath;
        doc.srcUrl += '?apiKey=' + this.api.sessionUser.accessToken;
        this.profileImageUrl = doc.srcUrl;
      }
    });
  }
}
