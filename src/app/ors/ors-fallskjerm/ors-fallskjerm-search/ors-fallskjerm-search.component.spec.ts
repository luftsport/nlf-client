import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsFallskjermSearchComponent } from './ors-motor-search.component';

describe('NlfOrsFallskjermSearchComponent', () => {
  let component: NlfOrsFallskjermSearchComponent;
  let fixture: ComponentFixture<NlfOrsFallskjermSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsFallskjermSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsFallskjermSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
