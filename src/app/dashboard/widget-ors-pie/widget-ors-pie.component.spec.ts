import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetOrsPieComponent } from './widget-ors-pie.component';

describe('WidgetOrsPieComponent', () => {
  let component: WidgetOrsPieComponent;
  let fixture: ComponentFixture<WidgetOrsPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetOrsPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetOrsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
