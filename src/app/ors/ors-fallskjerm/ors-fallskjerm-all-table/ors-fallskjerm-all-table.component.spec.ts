import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsFallskjermAllTableComponent } from './ors-fallskjerm-all-table.component';

describe('NlfOrsFallskjermAllTableComponent', () => {
  let component: NlfOrsFallskjermAllTableComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermAllTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermAllTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermAllTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
