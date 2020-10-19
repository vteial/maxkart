import { Component, OnInit } from '@angular/core';
import {ApiService} from '../@shared/api.service';
import {Router} from '@angular/router';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent extends BaseComponent implements OnInit {

  constructor(private apiService: ApiService, private router: Router) {
    super();
    super.viewName = 'Sign Out';
  }

  ngOnInit(): void {
    this.signOut();
  }

  signOut(): void {
    this.apiService.signOut(); console.log('sign out triggered...');
    this.router.navigateByUrl('/sign-in');
  }

}
