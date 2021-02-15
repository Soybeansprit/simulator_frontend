import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsAllSencesAnalysResultComponent } from './echarts-all-sences-analys-result.component';

describe('EchartsAllSencesAnalysResultComponent', () => {
  let component: EchartsAllSencesAnalysResultComponent;
  let fixture: ComponentFixture<EchartsAllSencesAnalysResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchartsAllSencesAnalysResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsAllSencesAnalysResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
