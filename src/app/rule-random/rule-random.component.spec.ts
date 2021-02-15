import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleRandomComponent } from './rule-random.component';

describe('RuleRandomComponent', () => {
  let component: RuleRandomComponent;
  let fixture: ComponentFixture<RuleRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleRandomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
