import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHospitalFacilitiesComponent } from './edit-hospital-facilities.component';

describe('EditHospitalFacilitiesComponent', () => {
  let component: EditHospitalFacilitiesComponent;
  let fixture: ComponentFixture<EditHospitalFacilitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditHospitalFacilitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHospitalFacilitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
