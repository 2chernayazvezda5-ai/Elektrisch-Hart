import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstablishmentLayout } from './establishment-layout';

describe('EstablishmentLayout', () => {
  let component: EstablishmentLayout;
  let fixture: ComponentFixture<EstablishmentLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablishmentLayout],
    }).compileComponents();

    fixture = TestBed.createComponent(EstablishmentLayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
