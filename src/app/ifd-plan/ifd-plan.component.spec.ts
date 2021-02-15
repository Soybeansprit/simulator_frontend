import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfdPlanComponent } from './ifd-plan.component';

describe('IfdPlanComponent', () => {
  let component: IfdPlanComponent;
  let fixture: ComponentFixture<IfdPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IfdPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IfdPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
