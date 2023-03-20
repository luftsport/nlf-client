import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfErrorComponent } from './error.component';

describe('NlfErrorComponent', () => {
  let component: NlfErrorComponent;
  let fixture: ComponentFixture<NlfErrorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
