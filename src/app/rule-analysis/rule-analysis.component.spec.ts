import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleAnalysisComponent } from './rule-analysis.component';

describe('RuleAnalysisComponent', () => {
  let component: RuleAnalysisComponent;
  let fixture: ComponentFixture<RuleAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
