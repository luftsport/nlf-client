import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsFallskjermMainComponent } from './ors-fallskjerm-main.component';

describe('NlfOrsFallskjermMainComponent', () => {
  let component: NlfOrsFallskjermMainComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
