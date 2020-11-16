import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
    this.viewName = 'sign out';
  }

  ngOnInit(): void {
  }

}
