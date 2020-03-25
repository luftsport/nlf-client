import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfMetMetarComponent } from './met-metar.component';

describe('NlfMetMetarComponent', () => {
  let component: NlfMetMetarComponent;
  let fixture: ComponentFixture<NlfMetMetarComponent>;

  beforeEach(async(() => {
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
