import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServicePortalService } from '../../../../service-portal.service';
import { SnackbarService } from '../../../../common/snackbar/snackbar.service';
import { AuthServiceService } from '../../../../portal-login/auth-service/auth-service.service';
@Component({
  selector: 'app-complete-consultation',
  standalone: false,
  templateUrl: './complete-consultation.component.html',
  styleUrl: './complete-consultation.component.css',
})
export class CompleteConsultationComponent {
  minDate = new Date();
  today = new Date();
  completeForm: any;
  showFollowUp: any;
  doctorData: any;
  timeSlots: any;
  slotType: any;
  selectedShift: any;
  slotValidation: any;
  editAdmin: any;
  role: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ServicePortalService: ServicePortalService,
    private snackbar: SnackbarService,
    private dialogRef: MatDialogRef<CompleteConsultationComponent>,
    private authService: AuthServiceService,
  ) {}
  ngOnInit() {
    this.editAdmin = this.authService?.getUserRole() === 'Admin' ? true : false;
    this.role = this.authService?.getUserRole();
    this.completeForm = new FormGroup({
      patientName: new FormControl(),
      opNumber: new FormControl(),
      date: new FormControl(),
      clinicalNotes: new FormControl(null, Validators.required),
      prescrition: new FormControl(null, Validators.required),
      advice: new FormControl(),
      followUpDate: new FormControl(),
      followUpSlot: new FormControl(),
      followUpRequired: new FormControl(),
    });
    console.log(this.data);
    this.completeForm.controls.followUpRequired.valueChanges.subscribe(
      (res: any) => {
        console.log(res);
        this.showFollowUp = res;
        if (res) {
          const followUpDate = this.completeForm.controls.followUpDate;
          followUpDate.setValidators(Validators.required);
          followUpDate.updateValidators();
          const followUpSlot = this.completeForm.controls.followUpSlot;
          followUpSlot.setValidators(Validators.required);
          followUpDate.updateValidators();
        }
        if (!res) {
          const followUpDate = this.completeForm.controls.followUpDate;
          followUpDate.clearValidators();
          followUpDate.updateValidators();
          const followUpSlot = this.completeForm.controls.followUpSlot;
          followUpSlot.clearValidators();
          followUpDate.updateValidators();
        }
      },
    );
    this.getDoctorById(this.data?.data?.appointmentDoctorId);
  }
  getDoctorById(id: any) {
    this.ServicePortalService.getDoctorById(id).subscribe((res: any) => {
      console.log(res);
      this.doctorData = res?.data;
      this.getSlot(this.doctorData?.adShift);
    });
  }
  getSlot(shift: any) {
    switch (shift) {
      case 'Morning':
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
        this.slotType = 1;
        this.completeForm.controls.followUpSlot.setValue(this.timeSlots[0]);
        break;

      case 'Evening':
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
        this.slotType = 2;
        this.completeForm.controls.followUpSlot.setValue(this.timeSlots[0]);
        break;
      case 'Night':
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
        this.slotType = 3;
        this.completeForm.controls.followUpSlot.setValue(this.timeSlots[0]);
        break;

      default:
        this.timeSlots = [];
    }
  }
  onSelectShiftDetails(event: any) {
    console.log(event.target.value);
    // yyyy-MM-dd

    this.selectedShift = event.target.value;
    this.checkSlotAvalability();
  }
  onDateChange(event: any) {
    console.log(event.target.value);
    if (event.target.value) {
      this.checkSlotAvalability();
    }
  }
  checkSlotAvalability() {
    const formattedDate = this.formatDate(
      this.completeForm.get('followUpDate')?.value,
    );
    if (this.selectedShift && formattedDate) {
      this.ServicePortalService.checkSlot(
        this.selectedShift,
        this.data?.data?.appointmentDoctorId,
        formattedDate,
      ).subscribe((res: any) => {
        console.log(res);
        if (res?.data == 0) {
          this.snackbar?.success(res?.message, 200);
          this.slotValidation = true;
        } else if (res?.data == 1) {
          this.slotValidation = false;
          this.selectedShift = null;
          this.completeForm.controls.followUpSlot.setValue(this.timeSlots[0]);
          this.snackbar.error(res?.message, 500);
        }
      });
    }
  }
  formatDate(date: Date): string {
    if (!date) return '';

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  saveConsultations() {
    let body = {
      role: this.role,
      opNumber: this.data?.data?.opNumber,
      consultationPatientId: this.data?.data?.appointmentUserId,
      consultationDoctorId: this.data?.data?.appointmentDoctorId,
      consultationClinicNotes: this.completeForm.controls.clinicalNotes.value,
      consultationPrescription: this.completeForm.controls.prescrition.value,
      consultationAdvice: this.completeForm.controls.advice.value,
      consultationFollowUp: this.showFollowUp,
      consultationFollowUpDate: this.formatDate(
        this.completeForm.controls.followUpDate.value,
      ),
      consultationFollowUpSlot: this.completeForm.controls.followUpSlot.value,
    };
    this.ServicePortalService.saveConsultations(body).subscribe((res: any) => {
      console.log(res);
      this.closeDialog();
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
