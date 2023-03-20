import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfContentViewComponent } from './content-view.component';

describe('NlfContentViewComponent', () => {
  let component: NlfContentViewComponent;
  let fixture: ComponentFixture<NlfContentViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfContentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfContentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
