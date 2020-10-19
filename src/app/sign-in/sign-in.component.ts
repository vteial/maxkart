import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

import {UserDto} from '../@model/core';
import {ApiService} from '../@shared/api.service';
import {environment} from '../../environments/environment';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent extends BaseComponent implements OnInit {

  model: UserDto = new UserDto();

  constructor(private api: ApiService, private toastr: ToastrService, private router: Router) {
    super();
    super.viewName = 'Sign In';
    if (!environment.production) {
      this.model.userId = 'crali';
      this.model.password = 'A123456*';
    }
  }

  ngOnInit(): void {
    if (this.api.sessionUser !== null) {
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit(): void {
    // console.log('Your form model : ', this.model);
    this.api.signIn(this.model).subscribe((data: any) => {
      // this.toastr.success('Welcome!', 'Ok!');
      this.api.processAndSetSessionUser(data);
      this.router.navigateByUrl('/home').finally(() => {});
    });
  }
}
