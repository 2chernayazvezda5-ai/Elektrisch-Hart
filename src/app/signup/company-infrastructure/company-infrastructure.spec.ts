import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyInfrastructure } from './company-infrastructure';

describe('CompanyInfrastructure', () => {
  let component: CompanyInfrastructure;
  let fixture: ComponentFixture<CompanyInfrastructure>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyInfrastructure],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyInfrastructure);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
