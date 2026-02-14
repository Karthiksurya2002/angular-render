import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpecialtyDoctorsComponent } from './edit-specialty-doctors.component';

describe('EditSpecialtyDoctorsComponent', () => {
  let component: EditSpecialtyDoctorsComponent;
  let fixture: ComponentFixture<EditSpecialtyDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditSpecialtyDoctorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSpecialtyDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
