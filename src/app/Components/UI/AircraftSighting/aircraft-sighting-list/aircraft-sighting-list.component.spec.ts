import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftSightingListComponent } from './aircraft-sighting-list.component';

describe('AircraftSightingListComponent', () => {
  let component: AircraftSightingListComponent;
  let fixture: ComponentFixture<AircraftSightingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AircraftSightingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftSightingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
