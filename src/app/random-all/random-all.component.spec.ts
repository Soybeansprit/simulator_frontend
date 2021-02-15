import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomAllComponent } from './random-all.component';

describe('RandomAllComponent', () => {
  let component: RandomAllComponent;
  let fixture: ComponentFixture<RandomAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
