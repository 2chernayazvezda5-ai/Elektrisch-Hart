import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverMap } from './driver-map';

describe('DriverMap', () => {
  let component: DriverMap;
  let fixture: ComponentFixture<DriverMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverMap],
    }).compileComponents();

    fixture = TestBed.createComponent(DriverMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
