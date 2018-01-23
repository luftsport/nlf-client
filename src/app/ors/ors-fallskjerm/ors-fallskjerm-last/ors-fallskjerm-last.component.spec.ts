import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsFallskjermLastComponent } from './ors-fallskjerm-last.component';

describe('NlfOrsFallskjermLastComponent', () => {
  let component: NlfOrsFallskjermLastComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermLastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermLastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
