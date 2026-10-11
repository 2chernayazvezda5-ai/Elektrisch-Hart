import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstablishmentDashboard } from './establishment-dashboard';

describe('EstablishmentDashboard', () => {
  let component: EstablishmentDashboard;
  let fixture: ComponentFixture<EstablishmentDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablishmentDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(EstablishmentDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
