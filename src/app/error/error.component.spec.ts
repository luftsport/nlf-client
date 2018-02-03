import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfErrorComponent } from './error.component';

describe('NlfErrorComponent', () => {
  let component: NlfErrorComponent;
  let fixture: ComponentFixture<NlfErrorComponent>;

  beforeEach(async(() => {
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
