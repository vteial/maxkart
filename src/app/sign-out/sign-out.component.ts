import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../base.component';
import {ApiService} from '../../../zunk/frontend-bo/src/app/@shared/api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent extends BaseComponent implements OnInit {

  constructor(private apiService: ApiService,
              private router: Router) {
    super();
    this.viewName = 'sign out';
  }

  ngOnInit(): void {
    this.signOut();
  }

  signOut(): void {
    this.apiService.signOut();
    console.log('sign out triggered...');
    this.router.navigateByUrl('/sign-in');
  }
}
