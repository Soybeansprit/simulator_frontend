import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsAllScenesComponent } from './echarts-all-scenes.component';

describe('EchartsAllScenesComponent', () => {
  let component: EchartsAllScenesComponent;
  let fixture: ComponentFixture<EchartsAllScenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchartsAllScenesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsAllScenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
