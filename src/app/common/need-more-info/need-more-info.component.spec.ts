import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedMoreInfoComponent } from './need-more-info.component';

describe('NeedMoreInfoComponent', () => {
  let component: NeedMoreInfoComponent;
  let fixture: ComponentFixture<NeedMoreInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeedMoreInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedMoreInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
