import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResolveLungoFunctionComponent } from './resolve-lungo-function.component';

describe('ResolveLungoFunctionComponent', () => {
  let component: ResolveLungoFunctionComponent;
  let fixture: ComponentFixture<ResolveLungoFunctionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveLungoFunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveLungoFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
