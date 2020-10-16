import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent extends BaseComponent implements OnInit {

  constructor(private location: Location) {
    super();
    super.viewName = 'Not Found';
  }

  ngOnInit(): void {
  }

  historyBack(): void {
    this.location.back();
  }

}
