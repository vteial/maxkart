import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() currentViewName: string;

  isExpanded = true;

  @Output() sidenavToggled = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidenav(): void {
    this.isExpanded = !this.isExpanded;
    this.sidenavToggled.emit(this.isExpanded);
  }

}
