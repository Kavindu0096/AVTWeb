import { TestBed, inject } from '@angular/core/testing';

import { JQVManagerService } from './jqvmanager.service';

describe('JQVManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JQVManagerService]
    });
  });

  it('should be created', inject([JQVManagerService], (service: JQVManagerService) => {
    expect(service).toBeTruthy();
  }));
});
