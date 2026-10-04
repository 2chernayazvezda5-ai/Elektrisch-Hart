import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyCategory } from './company-category';

describe('CompanyCategory', () => {
  let component: CompanyCategory;
  let fixture: ComponentFixture<CompanyCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyCategory],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyCategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
