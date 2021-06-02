import { TestBed } from '@angular/core/testing';

import { AircraftSightingService } from './aircraft-sighting.service';

describe('AircraftSightingService', () => {
  let service: AircraftSightingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AircraftSightingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
