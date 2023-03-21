import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NlfCompetenceTableComponent } from './competence-table.component';

describe('NlfCompetenceTableComponent', () => {
  let component: NlfCompetenceTableComponent;
  let fixture: ComponentFixture<NlfCompetenceTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NlfCompetenceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlfCompetenceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
