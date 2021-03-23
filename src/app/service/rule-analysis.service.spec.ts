import { TestBed } from '@angular/core/testing';

import { RuleAnalysisService } from './rule-analysis.service';

describe('RuleAnalysisService', () => {
  let service: RuleAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
