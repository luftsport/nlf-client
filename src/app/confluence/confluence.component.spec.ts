import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfConfluenceComponent } from './confluence.component';

describe('NlfConfluenceComponent', () => {
  let component: NlfConfluenceComponent;
  let fixture: ComponentFixture<NlfConfluenceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfConfluenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfConfluenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
