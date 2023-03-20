import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfMetMetarComponent } from './met-metar.component';

describe('NlfMetMetarComponent', () => {
  let component: NlfMetMetarComponent;
  let fixture: ComponentFixture<NlfMetMetarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfMetMetarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfMetMetarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
