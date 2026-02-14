import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelApprovedAppointmentComponent } from './cancel-approved-appointment.component';

describe('CancelApprovedAppointmentComponent', () => {
  let component: CancelApprovedAppointmentComponent;
  let fixture: ComponentFixture<CancelApprovedAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelApprovedAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelApprovedAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
