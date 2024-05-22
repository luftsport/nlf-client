import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrsSearchComponent } from './ors-search.component';

describe('OrsSearchComponent', () => {
  let component: OrsSearchComponent;
  let fixture: ComponentFixture<OrsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
