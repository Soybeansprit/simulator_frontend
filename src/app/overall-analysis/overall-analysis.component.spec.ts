import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallAnalysisComponent } from './overall-analysis.component';

describe('OverallAnalysisComponent', () => {
  let component: OverallAnalysisComponent;
  let fixture: ComponentFixture<OverallAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallAnalysisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
