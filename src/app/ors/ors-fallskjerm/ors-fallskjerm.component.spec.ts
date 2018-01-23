import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsFallskjermComponent } from './ors-fallskjerm.component';

describe('NlfOrsFallskjermComponent', () => {
  let component: NlfOrsFallskjermComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
