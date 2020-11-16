import {AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {BaseComponent} from '../base.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterViewInit {

  currentViewName = 'Home';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onActivate(baseComponent: BaseComponent): void {
    this.currentViewName = baseComponent.viewName;
  }
}
