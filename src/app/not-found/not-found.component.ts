import {Component, OnInit} from '@angular/core';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent extends BaseComponent implements OnInit {

  constructor() {
    super();
    this.viewName = 'not found';
  }

  ngOnInit(): void {
  }

}
