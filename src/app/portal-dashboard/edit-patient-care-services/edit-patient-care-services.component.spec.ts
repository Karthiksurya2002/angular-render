import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientCareServicesComponent } from './edit-patient-care-services.component';

describe('EditPatientCareServicesComponent', () => {
  let component: EditPatientCareServicesComponent;
  let fixture: ComponentFixture<EditPatientCareServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditPatientCareServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPatientCareServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
