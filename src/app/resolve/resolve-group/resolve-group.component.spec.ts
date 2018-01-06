import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveGroupComponent } from './resolve-group.component';

describe('ResolveGroupComponent', () => {
  let component: ResolveGroupComponent;
  let fixture: ComponentFixture<ResolveGroupComponent>;

  beforeEach(async(() => {
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
