import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantViewComponent } from './merchant-view.component';

describe('MerchantViewComponent', () => {
  let component: MerchantViewComponent;
  let fixture: ComponentFixture<MerchantViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
