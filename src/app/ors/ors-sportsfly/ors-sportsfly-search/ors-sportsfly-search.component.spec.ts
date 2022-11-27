import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsSportsflySearchComponent } from './ors-sportsfly-search.component';

describe('NlfOrsSportsflySearchComponent', () => {
  let component: NlfOrsSportsflySearchComponent;
  let fixture: ComponentFixture<NlfOrsSportsflySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfOrsSportsflySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsSportsflySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
