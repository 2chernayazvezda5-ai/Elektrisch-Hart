import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComplete } from './signup-complete';

describe('SignupComplete', () => {
  let component: SignupComplete;
  let fixture: ComponentFixture<SignupComplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComplete],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComplete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
