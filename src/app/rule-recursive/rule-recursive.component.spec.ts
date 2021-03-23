import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleRecursiveComponent } from './rule-recursive.component';

describe('RuleRecursiveComponent', () => {
  let component: RuleRecursiveComponent;
  let fixture: ComponentFixture<RuleRecursiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuleRecursiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleRecursiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
