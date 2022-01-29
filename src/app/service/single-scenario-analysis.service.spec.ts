import { TestBed } from '@angular/core/testing';

import { SingleScenarioAnalysisService } from './single-scenario-analysis.service';

describe('SingleScenarioAnalysisService', () => {
  let service: SingleScenarioAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleScenarioAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
