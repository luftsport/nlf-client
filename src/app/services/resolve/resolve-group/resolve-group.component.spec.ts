import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ResolveGroupComponent } from './resolve-group.component';

describe('ResolveGroupComponent', () => {
  let component: ResolveGroupComponent;
  let fixture: ComponentFixture<ResolveGroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
