import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveLungoFunctionComponent } from './resolve-lungo-function.component';

describe('ResolveLungoFunctionComponent', () => {
  let component: ResolveLungoFunctionComponent;
  let fixture: ComponentFixture<ResolveLungoFunctionComponent>;

  beforeEach(async(() => {
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
