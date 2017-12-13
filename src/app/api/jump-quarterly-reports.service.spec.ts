import { TestBed, inject } from '@angular/core/testing';

import { JumpQuarterlyReportsService } from './jump-quarterly-reports.service';

describe('JumpQuarterlyReportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JumpQuarterlyReportsService]
    });
  });

  it('should be created', inject([JumpQuarterlyReportsService], (service: JumpQuarterlyReportsService) => {
    expect(service).toBeTruthy();
  }));
});
