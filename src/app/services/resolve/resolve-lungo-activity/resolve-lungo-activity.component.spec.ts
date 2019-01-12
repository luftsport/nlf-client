import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveLungoActivityComponent } from './resolve-lungo-activity.component';

describe('ResolveLungoActivityComponent', () => {
  let component: ResolveLungoActivityComponent;
  let fixture: ComponentFixture<ResolveLungoActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveLungoActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveLungoActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
