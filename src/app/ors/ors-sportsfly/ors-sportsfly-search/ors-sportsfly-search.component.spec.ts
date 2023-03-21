import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfOrsSportsflySearchComponent } from './ors-sportsfly-search.component';

describe('NlfOrsSportsflySearchComponent', () => {
  let component: NlfOrsSportsflySearchComponent;
  let fixture: ComponentFixture<NlfOrsSportsflySearchComponent>;

  beforeEach(waitForAsync(() => {
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
