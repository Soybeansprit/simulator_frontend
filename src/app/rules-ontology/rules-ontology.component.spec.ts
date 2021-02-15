import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesOntologyComponent } from './rules-ontology.component';

describe('RulesOntologyComponent', () => {
  let component: RulesOntologyComponent;
  let fixture: ComponentFixture<RulesOntologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RulesOntologyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesOntologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
