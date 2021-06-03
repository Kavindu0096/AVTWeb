import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftSightingsComponent } from './aircraft-sightings.component';

describe('AircraftSightingsComponent', () => {
  let component: AircraftSightingsComponent;
  let fixture: ComponentFixture<AircraftSightingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AircraftSightingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftSightingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
