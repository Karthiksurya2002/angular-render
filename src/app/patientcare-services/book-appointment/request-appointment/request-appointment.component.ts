import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';

@Component({
  selector: 'app-request-appointment',
  standalone: false,
  templateUrl: './request-appointment.component.html',
  styleUrl: './request-appointment.component.css',
})
export class RequestAppointmentComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RequestAppointmentComponent>,
    private dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    console.log(this.data);
  }
  getDoctorImages(): string {
    const doctor = this.data;
    if (doctor?.imageBase64 && doctor?.contentType) {
      return `data:${doctor.contentType};base64,${doctor.imageBase64}`;
    }
    return '/photo.png';
  }
  closeDialog() {
    this.dialogRef.close();
  }
  openAppointmentForm() {
    const data = this.dialog.open(AppointmentFormComponent, {
      minWidth: '60vw',
      data: this.data,
    });
    data.afterClosed().subscribe((result) => {
      this.dialogRef.close();
    });
  }
}
