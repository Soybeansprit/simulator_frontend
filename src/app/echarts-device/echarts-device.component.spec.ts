import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsDeviceComponent } from './echarts-device.component';

describe('EchartsDeviceComponent', () => {
  let component: EchartsDeviceComponent;
  let fixture: ComponentFixture<EchartsDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EchartsDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EchartsDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
