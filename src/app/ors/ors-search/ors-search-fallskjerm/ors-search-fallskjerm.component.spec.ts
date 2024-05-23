import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfOrsSearchFallskjermComponent } from './ors-search-fallskjerm.component';

describe('NlfOrsSearchFallskjermComponent', () => {
  let component: NlfOrsSearchFallskjermComponent;
  let fixture: ComponentFixture<NlfOrsSearchFallskjermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NlfOrsSearchFallskjermComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfOrsSearchFallskjermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
