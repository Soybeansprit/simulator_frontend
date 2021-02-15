import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsAllScenesRulesAnalysComponent } from './echarts-all-scenes-rules-analys.component';

describe('EchartsAllScenesRulesAnalysComponent', () => {
  let component: EchartsAllScenesRulesAnalysComponent;
  let fixture: ComponentFixture<EchartsAllScenesRulesAnalysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchartsAllScenesRulesAnalysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsAllScenesRulesAnalysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
