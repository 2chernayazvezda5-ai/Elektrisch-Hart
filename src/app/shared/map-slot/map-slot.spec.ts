import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapSlot } from './map-slot';

describe('MapSlot', () => {
  let component: MapSlot;
  let fixture: ComponentFixture<MapSlot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapSlot],
    }).compileComponents();

    fixture = TestBed.createComponent(MapSlot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
