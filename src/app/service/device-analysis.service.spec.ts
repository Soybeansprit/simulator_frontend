import { TestBed } from '@angular/core/testing';

import { DeviceAnalysisService } from './device-analysis.service';

describe('DeviceAnalysisService', () => {
  let service: DeviceAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
