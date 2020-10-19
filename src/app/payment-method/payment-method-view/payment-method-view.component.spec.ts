import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodViewComponent } from './payment-method-view.component';

describe('PaymentMethodViewComponent', () => {
  let component: PaymentMethodViewComponent;
  let fixture: ComponentFixture<PaymentMethodViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMethodViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
