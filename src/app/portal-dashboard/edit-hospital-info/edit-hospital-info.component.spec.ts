import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHospitalInfoComponent } from './edit-hospital-info.component';

describe('EditHospitalInfoComponent', () => {
  let component: EditHospitalInfoComponent;
  let fixture: ComponentFixture<EditHospitalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditHospitalInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHospitalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
