import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientConsentListComponent } from './patient-consent-list.component';

describe('PatientConsentListComponent', () => {
  let component: PatientConsentListComponent;
  let fixture: ComponentFixture<PatientConsentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientConsentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientConsentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
