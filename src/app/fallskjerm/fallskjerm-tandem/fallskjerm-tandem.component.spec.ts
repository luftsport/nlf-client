import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfFallskjermTandemComponent } from './fallskjerm-tandem.component';

describe('NlfFallskjermTandemComponent', () => {
  let component: NlfFallskjermTandemComponent;
  let fixture: ComponentFixture<NlfFallskjermTandemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NlfFallskjermTandemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfFallskjermTandemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
