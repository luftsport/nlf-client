import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfNifCompareComponent } from './nif-compare.component';

describe('NlfNifCompareComponent', () => {
  let component: NlfNifCompareComponent;
  let fixture: ComponentFixture<NlfNifCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NlfNifCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfNifCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
