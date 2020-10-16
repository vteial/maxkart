import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  appTitle = 'Paymence BO';

  appDescription = 'Back Office Application';

  currentViewName = 'Home';

  isExpanded = true;

  // @LocalStorage()
  sessionUser: any;

  navBgColor: string;

  state = 'collapsed';

  constructor(private cdr: ChangeDetectorRef) {
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

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  toggleSidenav(isExpanded: boolean): void {
    this.isExpanded = isExpanded;
    this.cdr.detectChanges();
  }

  toggleSidenavCollapsed(): void {
    this.isExpanded = !this.isExpanded;
    this.state = 'collapsed';
  }

  toggleSidenavHidden(): void {
    this.isExpanded = !this.isExpanded;
    this.state = 'hidden';
  }

  openSideNav(): void {
    this.isExpanded = true;
  }

  closeSideNav(): void {
    this.isExpanded = false;
  }

}
