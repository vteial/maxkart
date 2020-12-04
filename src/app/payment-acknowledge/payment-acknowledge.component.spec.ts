import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAcknowledgeComponent } from './payment-acknowledge.component';

describe('PaymentAcknowledgeComponent', () => {
  let component: PaymentAcknowledgeComponent;
  let fixture: ComponentFixture<PaymentAcknowledgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentAcknowledgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentAcknowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
