import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeBirthdate } from './change-birthdate';

describe('ChangeBirthdate', () => {
  let component: ChangeBirthdate;
  let fixture: ComponentFixture<ChangeBirthdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeBirthdate],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeBirthdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
