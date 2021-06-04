import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftLookupComponent } from './aircraft-lookup.component';

describe('AircraftLookupComponent', () => {
  let component: AircraftLookupComponent;
  let fixture: ComponentFixture<AircraftLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AircraftLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
