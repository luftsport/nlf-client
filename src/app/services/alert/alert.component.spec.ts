import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfAlertComponent } from './alert.component';

describe('NlfAlertComponent', () => {
  let component: NlfAlertComponent;
  let fixture: ComponentFixture<NlfAlertComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
