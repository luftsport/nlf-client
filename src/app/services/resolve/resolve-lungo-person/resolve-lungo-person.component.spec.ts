import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveLungoPersonComponent } from './resolve-lungo-person.component';

describe('ResolveLungoPersonComponent', () => {
  let component: ResolveLungoPersonComponent;
  let fixture: ComponentFixture<ResolveLungoPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveLungoPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveLungoPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
