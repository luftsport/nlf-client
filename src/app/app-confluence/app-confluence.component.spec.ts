import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConfluenceComponent } from './app-confluence.component';

describe('AppConfluenceComponent', () => {
  let component: AppConfluenceComponent;
  let fixture: ComponentFixture<AppConfluenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppConfluenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppConfluenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
