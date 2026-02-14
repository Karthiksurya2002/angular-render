import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../../../common/snackbar/snackbar.service';
import { ServicePortalService } from '../../../../service-portal.service';
import { AuthServiceService } from '../../../../portal-login/auth-service/auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-cancel-approved-appointment',
  standalone: false,
  templateUrl: './cancel-approved-appointment.component.html',
  styleUrl: './cancel-approved-appointment.component.css',
})
export class CancelApprovedAppointmentComponent {
  newDate!: Date;
  reason: string = '';
  minDate = new Date();
  rescheduleOption: boolean = false;
  status: any;
  role: any;
  form: any;
  timeSlots: any = [];
  shift: any;
  selectedShift: any;
  slotValidation: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private ServicePortalService: ServicePortalService,
    private dialogRef: MatDialogRef<CancelApprovedAppointmentComponent>,
    private authService: AuthServiceService,
  ) {}
  ngOnInit(): void {
    this.status = this.data?.appointmentStatus;
    this.shift = this.data?.slotType;
    this.role = this.authService?.getUserRole();
    this.form = new FormGroup({
      slot: new FormControl(Validators.required),
      patientPreferredDate: new FormControl(Validators.required),
    });
    this.getSlot(this.shift);
  }
  getSlot(shift: any) {
    switch (shift) {
      case 1:
        this.timeSlots = [
          'Select Time Slots ',
          '09:00 AM - 09:30 AM',
          '09:30 AM - 10:00 AM',
          '10:00 AM - 10:30 AM',
          '10:30 AM - 11:00 AM',
          '12:00 PM - 12:30 PM',
          '12:30 PM - 01:00 PM',
          '01:00 PM - 01:30 PM',
          '01:30 PM - 02:00 PM',
        ];

        break;

      case '2':
        this.timeSlots = [
          'Select Time Slots ',
          '02:00 PM - 02:30 PM',
          '02:30 PM - 03:00 PM',
          '03:00 PM - 03:30 PM',
          '03:30 PM - 03:00 PM',
          '04:00 PM - 04:30 PM',
          '04:30 PM - 05:00 PM',
          '05:00 PM - 05:30 PM',
          '05:30 PM - 06:00 PM',
        ];

        break;
      case '3':
        this.timeSlots = [
          'Select Time Slots ',
          '06:00 PM - 06:30 PM',
          '06:30 PM - 07:00 PM',
          '07:00 PM - 07:30 PM',
          '07:30 PM - 08:00 PM',
          '08:00 PM - 08:30 PM',
          '08:30 PM - 09:00 PM',
          '09:00 PM - 09:30 PM',
          '09:30 PM - 10:00 PM',
          '10:00 PM - 10:30 PM',
          '10:30 PM - 11:00 PM',
        ];
        break;

      default:
        this.timeSlots = [];
    }
    this.form.controls.slot.setValue(this.timeSlots[0]);
    // for (let i = 0; i < this.timeSlots.length; i++) {
    //   if (this.timeSlots[i] == this.data?.selectedSlot) {
    //     this.form.controls.slot.setValue(this.timeSlots[i]);
    //     return;
    //   }
    // }
  }
  onSelectShiftDetails(event: any) {
    console.log(event);
    this.selectedShift = event.target.value;
    if (this.selectedShift) {
      this.checkSlotAvalability();
    }
  }
  checkSlotAvalability() {
    const formattedDate = this.formatDate(
      this.form.get('patientPreferredDate')?.value,
    );
    if (this.selectedShift && formattedDate) {
      this.ServicePortalService.checkSlot(
        this.selectedShift,
        this.data?.appointmentDoctorId,
        formattedDate,
      ).subscribe((res: any) => {
        console.log(res);
        if (res?.data == 0) {
          this.snackbar?.success(res?.message, 200);
          this.slotValidation = true;
        } else if (res?.data == 1) {
          this.slotValidation = false;
          this.selectedShift = null;
          this.form.controls.slot.setValue(this.timeSlots[0]);
          this.snackbar.error(res?.message, 500);
        }
      });
    }
  }
  changeAppointmentDate() {
    this.rescheduleOption = !this.rescheduleOption;
  }

  onCancel() {
    this.ServicePortalService.cancelApprovedAppointment(
      this.data?.opNumber,
      this.role,
    ).subscribe(
      (res: any) => {
        this.snackbar.success(res?.message, 200);
        this.dialogRef.close(true);
      },
      (error: any) => {
        this.snackbar.success(error?.message, 500);
      },
    );
  }
  onClose() {
    this.dialogRef.close();
  }
  onReschedule() {
    let body = {
      opNumber: this.data?.opNumber,
      onRescheduleReson: this.reason,
      onRescheduleDate: this.formatDate(
        this.form.controls.patientPreferredDate.value,
      ),
      rescheduleBy: this.role,
      selectedSlot: this.selectedShift,
    };
    this.ServicePortalService.onRescheduleAppointment(body).subscribe(
      (res: any) => {
        this.snackbar.success(res?.message, 200);
        this.dialogRef.close(true);
      },
      (error: any) => {
        this.snackbar.success(error?.message, 500);
      },
    );
  }
  formatDate(date: Date): string {
    if (!date) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
