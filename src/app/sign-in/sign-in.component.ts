import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
    this.viewName = 'sign in';
  }

  ngOnInit(): void {
  }

}
