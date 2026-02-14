import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServicePortalService } from '../../../../service-portal.service';
import { AuthServiceService } from '../../../../portal-login/auth-service/auth-service.service';
import { SnackbarService } from '../../../../common/snackbar/snackbar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-appointment-form',
  standalone: false,
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.css',
})
export class AppointmentFormComponent {
  appointmentForm: any;
  appointmentType: any;
  appointmentBookedBy: any;
  selectedShift: any;
  timeSlots: any;
  minDate = new Date();
  slotValidation: boolean = false;
  slotType: any;
  constructor(
    private dialogRef: MatDialogRef<AppointmentFormComponent>,
    private ServicePortalService: ServicePortalService,
    private authService: AuthServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbar: SnackbarService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    console.log(this.data);

    this.appointmentForm = new FormGroup({
      patientFirstName: new FormControl('', Validators.required),
      patientLastName: new FormControl('', Validators.required),
      patientAge: new FormControl('', Validators.required),
      patientEmailId: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      patientDOB: new FormControl('', Validators.required),
      patientAddress: new FormControl('', Validators.required),
      patientMobile: new FormControl('', Validators.required),
      patientSpecialty: new FormControl('', Validators.required),
      patientDoctorName: new FormControl('', Validators.required),
      patientGender: new FormControl('', Validators.required),
      patientPreferredDate: new FormControl('', Validators.required),
      otherDetails: new FormControl('', Validators.required),
      slot: new FormControl('', Validators.required),
    });
    const userId = this.authService.getUserId();
    const role = this.authService.getUserRole();
    this.appointmentType = 'DoctorAppointment';
    if (role == 'Admin') {
      this.getUserDetails(userId);
      this.appointmentBookedBy = 'BookedByAdmin';
    } else if (role == 'Doctor') {
      this.getUserDetailss(userId);
      this.appointmentBookedBy = 'BookedByDoctor';
    } else {
      this.getUserDetails(userId);
      this.appointmentBookedBy = 'BookedByUser';
    }
    if (this.appointmentType === 'Admin') {
      this.appointmentForm.get('patientFirstName')?.disable();
      this.appointmentForm.get('patientLastName')?.disable();
      this.appointmentForm.get('patientEmailId')?.disable();
      this.appointmentForm.get('patientAddress')?.disable();
      this.appointmentForm.get('patientMobile')?.disable();
    }
    this.getSlot(this.data?.adShift);
    this.appointmentForm.controls.slot.setValue(this.timeSlots[0]);
    // this.appointmentForm
    //   .get('patientDOB')
    //   .valueChanges.subscribe((res: any) => {
    //     console.log(res);
    //     this.checkSlotAvalability();
    //   });
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
        break;

      default:
        this.timeSlots = [];
    }
  }
  get hasError() {
    return this.appointmentForm.controls;
  }
  closeDialog() {
    this.dialogRef.close();
  }
  getUserDetails(id: any) {
    this.ServicePortalService.getUserDetails(id).subscribe((res: any) => {
      console.log(res);
      this.appointmentForm.patchValue({
        patientDoctorName: this.data?.adDoctorName,
        patientSpecialty: this.data?.adSpecialties,
        patientFirstName: res?.data?.userName,
        patientLastName: res?.data?.lastName,
        patientEmailId: res?.data?.emailId,
        patientAddress: res?.data?.address,
        patientMobile: res?.data?.mobileNo,
      });
    });
  }
  getUserDetailss(userId: any) {
    this.ServicePortalService.getUserDetailss(userId).subscribe((res: any) => {
      console.log(res);
      this.appointmentForm.patchValue({
        patientDoctorName: this.data?.adDoctorName,
        patientSpecialty: this.data?.adSpecialties,
        patientFirstName: res?.data?.adDoctorName,
        patientLastName: res?.data?.adDoctorName,
        patientEmailId: res?.data?.emailId,
        patientAddress: res?.data?.adAddress,
        patientMobile: res?.data?.adMobile,
      });
    });
  }

  onSubmit() {
    const body = {
      patientFirstName: this.appointmentForm.get('patientFirstName')?.value,
      patientLastName: this.appointmentForm.get('patientLastName')?.value,
      patientAge: Number(this.appointmentForm.get('patientAge')?.value),
      patientEmailId: this.appointmentForm.get('patientEmailId')?.value,
      patientDOB: this.formatDate(
        this.appointmentForm.get('patientDOB')?.value,
      ),
      patientAddress: this.appointmentForm.get('patientAddress')?.value,
      patientMobile: String(this.appointmentForm.get('patientMobile')?.value),
      patientSpecialty: this.appointmentForm.get('patientSpecialty')?.value,
      patientDoctorName: this.appointmentForm.get('patientDoctorName')?.value,
      patientGender: this.appointmentForm.get('patientGender')?.value,
      patientPreferredDate: this.formatDate(
        this.appointmentForm.get('patientPreferredDate')?.value,
      ),
      otherDetails: this.appointmentForm.get('otherDetails')?.value,
      appointmentDoctorId: Number(this.data?.id),
      appointmentUserId: Number(this.authService.getUserId()),
      appointmentType: this.appointmentType,
      // appointmentBookedBy: this.appointmentBookedBy,
      appointmentBookedBy: this.appointmentBookedBy,
      appointmentCreatedBy: this.authService.getUserRole(),
      selectedSlot: this.selectedShift,
      slotType: this.slotType,
    };

    this.ServicePortalService.bookAppointment(body).subscribe((res: any) => {
      console.log(res);
      this.snackbar.success(res?.message, res?.status);
      this.closeDialog();
      this.router.navigateByUrl('/patientcare/my-request-list');
    });
  }
  onSelectShiftDetails(event: any) {
    console.log(event.target.value);
    // yyyy-MM-dd

    this.selectedShift = event.target.value;
    this.checkSlotAvalability();
    // if (this.selectedShift) {
    //   this.ServicePortalService.checkSlot(
    //     this.selectedShift,
    //     this.data?.id,
    //     formattedDate,
    //   ).subscribe((res: any) => {
    //     console.log(res);
    //     if (res?.data == 0) {
    //       this.snackbar?.success(res?.message, 200);
    //       this.slotValidation = true;
    //     } else if (res?.data == 1) {
    //       this.slotValidation = false;
    //       this.selectedShift = null;
    //       this.appointmentForm.controls.slot.setValue(this.timeSlots[0]);
    //       this.snackbar.error(res?.message, 500);
    //     }
    //   });
    // }
  }
  onDateChange(event: any) {
    console.log(event.target.value);
    if (event.target.value) {
      this.checkSlotAvalability();
    }
  }
  checkSlotAvalability() {
    const formattedDate = this.formatDate(
      this.appointmentForm.get('patientPreferredDate')?.value,
    );
    if (this.selectedShift && formattedDate) {
      this.ServicePortalService.checkSlot(
        this.selectedShift,
        this.data?.id,
        formattedDate,
      ).subscribe((res: any) => {
        console.log(res);
        if (res?.data == 0) {
          this.snackbar?.success(res?.message, 200);
          this.slotValidation = true;
        } else if (res?.data == 1) {
          this.slotValidation = false;
          this.selectedShift = null;
          this.appointmentForm.controls.slot.setValue(this.timeSlots[0]);
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
}
