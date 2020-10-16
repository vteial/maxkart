import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

  appTitle = 'Paymence BO';

  appDescription = 'Back Office Application';

  currentViewName = 'Home';

  isExpanded = true;

  // @LocalStorage()
  sessionUser: any;

  navBgColor: string;

  state = 'collapsed';

  constructor() {
    if (environment.theme === 'cosmo') {
      this.navBgColor = '#2780e3';
    } else {
      this.navBgColor = '#593196';
    }
    console.log(`navBgColr : ${this.navBgColor}`);
  }

  ngOnInit(): void {
    this.sessionUser = {
      name: 'eialarasu',
      roleId: 'admin',
      avatarUrl: 'assets/images/avatar_2x.png'
    };
  }

  toggleSidenavCollapsed(): void {
    this.isExpanded = !this.isExpanded;
    this.state = 'collapsed';
  }

  toggleSidenavHidden(): void {
    this.isExpanded = !this.isExpanded;
    this.state = 'hidden';
  }

  toggleSidenav(isExpanded): void {
    this.isExpanded = isExpanded;
  }

  open(): void {
    this.isExpanded = true;
  }

  close(): void {
    this.isExpanded = false;
  }

}
