import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlfCompetenceTableComponent } from './competence-table.component';

describe('NlfCompetenceTableComponent', () => {
  let component: NlfCompetenceTableComponent;
  let fixture: ComponentFixture<NlfCompetenceTableComponent>;

  beforeEach(async(() => {
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
