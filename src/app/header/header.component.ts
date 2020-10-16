import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {SizeObserver, SizeObserverService} from '@service-work/size-observer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  currentViewName: string;

  isExpanded = true;

  @Output()
  sidenavToggled = new EventEmitter<boolean>();

  @ViewChild('headerElement')
  elementRef: ElementRef<HTMLInputElement>;

  private sizeObserver: SizeObserver;

  constructor(private sizeObserverService: SizeObserverService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.sizeObserver = this.sizeObserverService.observe(this.elementRef);
    this.sizeObserver.widthChanges$.subscribe(size => {
      if (size.width < 768) {
        if (this.isExpanded) {
          this.isExpanded = false;
          this.sidenavToggled.emit(this.isExpanded);
        }
      }
      if (size.width > 768) {
        if (!this.isExpanded) {
          this.isExpanded = true;
          this.sidenavToggled.emit(this.isExpanded);
        }
      }
      // console.log(`width: ${size.width} wclazz: ${size.widthClass} isExpanded: ${this.isExpanded}`);
    });
  }

  ngOnDestroy(): void {
    this.sizeObserver.complete();
  }

  toggleSidenav(): void {
    this.isExpanded = !this.isExpanded;
    this.sidenavToggled.emit(this.isExpanded);
  }

}
