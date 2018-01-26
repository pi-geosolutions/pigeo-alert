import { TestBed, inject } from '@angular/core/testing';

import { FeatureOverlayService } from './feature-overlay.service';

describe('FeatureOverlayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeatureOverlayService]
    });
  });

  it('should be created', inject([FeatureOverlayService], (service: FeatureOverlayService) => {
    expect(service).toBeTruthy();
  }));
});
