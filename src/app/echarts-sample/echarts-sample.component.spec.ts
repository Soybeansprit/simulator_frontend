import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsSampleComponent } from './echarts-sample.component';

describe('EchartsSampleComponent', () => {
  let component: EchartsSampleComponent;
  let fixture: ComponentFixture<EchartsSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchartsSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
