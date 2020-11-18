import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../base.component';
import {User} from '../@model/core';
import {Router} from '@angular/router';
import {ApiService} from '../@shared/api.service';
import {environment} from '../../environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends BaseComponent implements OnInit {

  model: User = new User();

  constructor(private api: ApiService,
              private snackBar: MatSnackBar,
              private router: Router) {
    super();
    this.viewName = 'sign in';
    if (!environment.production) {
      this.model.userId = 'crali';
      this.model.password = 'A123456*';
    }
  }

  ngOnInit(): void {
    // if (this.api.sessionUser !== null) {
    //   this.router.navigateByUrl('/home');
    // }
  }

  onSubmit(): void {
    // console.log('Your form model : ', this.model);
    if (this.api.signIn(this.model)) {
      this.router.navigateByUrl('/home');
    } else {
      this.snackBar.open('Invalid UserId/Password', 'Ok', {
        duration: 5000
      });
    }
  }

}
