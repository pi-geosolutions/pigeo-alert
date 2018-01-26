import { TestBed, inject } from '@angular/core/testing';

import { NgeoUtilsService } from './ngeo-utils.service';

describe('NgeoUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgeoUtilsService]
    });
  });

  it('should be created', inject([NgeoUtilsService], (service: NgeoUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
