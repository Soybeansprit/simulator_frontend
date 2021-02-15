import { TestBed } from '@angular/core/testing';

import { DeviceResultService } from './device-result.service';

describe('DeviceResultService', () => {
  let service: DeviceResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
