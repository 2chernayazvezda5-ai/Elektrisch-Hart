import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverVehicle } from './driver-vehicle';

describe('DriverVehicle', () => {
  let component: DriverVehicle;
  let fixture: ComponentFixture<DriverVehicle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverVehicle],
    }).compileComponents();

    fixture = TestBed.createComponent(DriverVehicle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
