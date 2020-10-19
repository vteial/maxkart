import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';
import {LocalStorage} from 'ngx-webstorage';
import {ReactiveFormConfig} from '@rxweb/reactive-form-validators';
import {BaseComponent} from './base.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  appTitle = 'Paymence BO';

  appDescription = 'Back Office Application';

  currentViewName = 'Home';

  isExpanded = true;

  @LocalStorage()
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
    ReactiveFormConfig.set({
      validationMessage: {
        required: 'This field is required.',
        alpha: 'This should have only alphabets and spaces.',
        minLength: 'This should have minimum of {{0}} characters.',
        password: 'This should satisfy the above condition.',
        compare: 'This should match with another field'
      }
    });
  }

  ngOnInit(): void {
    // this.sessionUser = {
    //   name: 'eialarasu',
    //   roleId: 'admin',
    //   avatarUrl: 'assets/images/avatar_2x.png'
    // };
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onActivate(baseComponent: BaseComponent): void {
    this.currentViewName = baseComponent.viewName;
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
