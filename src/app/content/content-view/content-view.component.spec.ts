import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfContentViewComponent } from './content-view.component';

describe('NlfContentViewComponent', () => {
  let component: NlfContentViewComponent;
  let fixture: ComponentFixture<NlfContentViewComponent>;

  beforeEach(async(() => {
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
