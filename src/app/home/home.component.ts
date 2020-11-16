import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
    this.viewName = 'home';
  }

  ngOnInit(): void {
  }

}
