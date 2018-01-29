import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneSearchComponent } from './zone-search.component';

describe('ZoneSearchComponent', () => {
  let component: ZoneSearchComponent;
  let fixture: ComponentFixture<ZoneSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
