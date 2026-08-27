import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FindGroups } from './find-groups';

describe('FindGroups', () => {
  let component: FindGroups;
  let fixture: ComponentFixture<FindGroups>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindGroups],
    }).compileComponents();

    fixture = TestBed.createComponent(FindGroups);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
