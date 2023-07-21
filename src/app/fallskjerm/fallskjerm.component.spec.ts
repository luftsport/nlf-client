import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfFallskjermComponent } from './fallskjerm.component';

describe('NlfFallskjermComponent', () => {
  let component: NlfFallskjermComponent;
  let fixture: ComponentFixture<NlfFallskjermComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NlfFallskjermComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfFallskjermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
