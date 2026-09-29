import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyLocation } from './company-location';

describe('CompanyLocation', () => {
  let component: CompanyLocation;
  let fixture: ComponentFixture<CompanyLocation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyLocation],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyLocation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
